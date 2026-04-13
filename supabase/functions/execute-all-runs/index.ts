import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000
const MAX_RUN_RETRIES = 9999
const ACTIVE_ORDER_RETRY_MS = 60 * 1000
const TEMPORARY_RETRY_MS = 60 * 1000

const TEMPORARY_ERRORS = [
  'balance', 'not have enough', 'processing another transaction',
  'active order with this link', 'wait until order being completed',
  'rate limit', 'timeout', 'temporarily', 'too many requests',
  'already has an order', 'order in progress', 'link currently active',
  'processing previous order', 'wait for completion',
]

const ACCOUNT_SPECIFIC_ERRORS = [
  'invalid api key', 'api key not found', 'invalid key',
  'unauthorized', 'authentication failed', 'wrong api key', 'api key invalid',
]

const TRY_NEXT_PROVIDER_ERRORS = [
  'quantity less than minimal', 'quantity less than minimum', 'min quantity',
  'minimum order', 'minimum quantity', 'max quantity', 'maximum quantity',
  'quantity more than maximum', 'service not found', 'incorrect service',
  'invalid service', 'service unavailable', 'service is not available',
  'disabled', 'not work', 'maintenance', 'down',
]

interface ProviderAccount {
  id: string
  provider_id: string
  name: string
  api_key: string
  api_url: string
  priority: number
  is_active: boolean
  last_used_at: string | null
}

interface ServiceMapping {
  id: string
  service_id: string
  provider_account_id: string
  provider_service_id: string
  sort_order: number
  is_active: boolean
  provider_account: ProviderAccount
}

// Module-level caches
const balanceCache = new Map<string, { balance: number; checkedAt: number }>()

const supabaseModule = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// ==========================================
// OPTIMIZED: Per-invocation mapping cache
// Avoids repeated DB queries for same service
// ==========================================
class MappingCache {
  private cache = new Map<string, { account: ProviderAccount; providerServiceId: string }[]>()
  
  async getForService(supabase: any, serviceId: string, excludeIds: string[], executionId: string): Promise<{ account: ProviderAccount; providerServiceId: string }[]> {
    // Fetch once per service per invocation
    if (!this.cache.has(serviceId)) {
      const { data: mappings, error } = await supabase
        .from('service_provider_mapping')
        .select(`*, provider_account:provider_accounts(*)`)
        .eq('service_id', serviceId)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      
      if (error || !mappings || mappings.length === 0) {
        this.cache.set(serviceId, [])
      } else {
        const sorted = [...mappings].sort((a: any, b: any) => {
          const aPriority = a.sort_order || 0
          const bPriority = b.sort_order || 0
          if (aPriority !== bPriority) return aPriority - bPriority
          const aTime = a.provider_account?.last_used_at ? new Date(a.provider_account.last_used_at).getTime() : 0
          const bTime = b.provider_account?.last_used_at ? new Date(b.provider_account.last_used_at).getTime() : 0
          return aTime - bTime
        })
        
        const accounts: { account: ProviderAccount; providerServiceId: string }[] = []
        for (const mapping of sorted) {
          const account = mapping.provider_account as ProviderAccount
          if (account && account.is_active) {
            accounts.push({ account, providerServiceId: mapping.provider_service_id })
          }
        }
        this.cache.set(serviceId, accounts)
      }
    }
    
    // Return filtered copy (excluding busy accounts)
    const all = this.cache.get(serviceId) || []
    return all.filter(a => !excludeIds.includes(a.account.id))
  }
  
  hasAnyForService(serviceId: string): boolean {
    return (this.cache.get(serviceId) || []).length > 0
  }
}

async function checkProviderBalance(account: ProviderAccount): Promise<{ hasBalance: boolean; balance: number }> {
  const cached = balanceCache.get(account.id)
  if (cached && Date.now() - cached.checkedAt < 30000) {
    return { hasBalance: cached.balance > 0, balance: cached.balance }
  }

  try {
    const formData = new URLSearchParams()
    formData.append('key', account.api_key)
    formData.append('action', 'balance')

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(account.api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    const responseText = await response.text()

    let result
    try { result = JSON.parse(responseText) } catch {
      return { hasBalance: true, balance: -1 }
    }

    const balance = parseFloat(result.balance || result.funds || result.amount || '0')
    balanceCache.set(account.id, { balance, checkedAt: Date.now() })
    console.log(`💰 ${account.name} balance: ${balance}`)
    return { hasBalance: balance > 0, balance }
  } catch (error) {
    return { hasBalance: true, balance: -1 }
  }
}

async function updateAccountLastUsed(supabase: any, accountId: string) {
  await supabase
    .from('provider_accounts')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', accountId)
}

type ProviderStatusCheckResult =
  | { ok: true; data: any; rawText: string }
  | { ok: false; error: string; rawText: string }

async function checkProviderOrderStatusWithRetries(params: {
  apiUrl: string; apiKey: string; providerOrderId: string;
  maxAttempts?: number; attemptDelayMs?: number;
}): Promise<ProviderStatusCheckResult> {
  const maxAttempts = params.maxAttempts ?? 3
  const attemptDelayMs = params.attemptDelayMs ?? 2000

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const formData = new URLSearchParams()
    formData.append('key', params.apiKey)
    formData.append('action', 'status')
    formData.append('order', params.providerOrderId)

    let rawText = ''
    try {
      const response = await fetch(params.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      })
      rawText = await response.text()

      let result: any
      try { result = JSON.parse(rawText) } catch { result = { error: rawText } }

      if (result?.error || result?.status === 'fail') {
        const err = (result?.message || result?.error || 'Provider status error')?.toString()
        const retryableNotFound = err.toLowerCase().includes('not found') ||
          err.toLowerCase().includes('incorrect order') || err.toLowerCase().includes('wrong order')

        if (retryableNotFound && attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, attemptDelayMs))
          continue
        }
        return { ok: false, error: err, rawText }
      }
      return { ok: true, data: result, rawText }
    } catch (e: any) {
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, attemptDelayMs))
        continue
      }
      return { ok: false, error: `Network error: ${e?.message || 'Unknown'}`, rawText }
    }
  }
  return { ok: false, error: 'Unknown provider status error', rawText: '' }
}

const detectPlatformFromLink = (url: string): string | null => {
  const lower = url.toLowerCase()
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'instagram'
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube'
  if (lower.includes('tiktok.com')) return 'tiktok'
  if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter'
  if (lower.includes('facebook.com') || lower.includes('fb.com')) return 'facebook'
  return null
}

const detectPlatformFromService = (serviceName: string): string | null => {
  const lower = serviceName.toLowerCase()
  if (lower.includes('instagram') || lower.includes('ig ')) return 'instagram'
  if (lower.includes('youtube') || lower.includes('yt ')) return 'youtube'
  if (lower.includes('tiktok') || lower.includes('tt ')) return 'tiktok'
  if (lower.includes('twitter') || lower.includes('x ')) return 'twitter'
  if (lower.includes('facebook') || lower.includes('fb ')) return 'facebook'
  return null
}

const isValidUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)

const normalizeLink = (value?: string | null) => (value || '').toLowerCase().trim().replace(/\/$/, '')

const isTerminalProviderStatus = (status?: string | null) => {
  const normalized = (status || '').toLowerCase().trim()
  return ['completed', 'complete', 'partial', 'refunded', 'canceled', 'cancelled', 'error', 'failed', 'success', 'refund', 'canscelled'].includes(normalized)
}

const isFailedProviderStatus = (status?: string | null) => {
  const normalized = (status || '').toLowerCase().trim()
  return ['refunded', 'canceled', 'cancelled', 'error', 'failed', 'refund', 'canscelled'].includes(normalized)
}

const getNestedEngagementOrderLink = (value: any) => {
  if (Array.isArray(value)) {
    return getNestedEngagementOrderLink(value[0])
  }
  if (value?.engagement_order) {
    return getNestedEngagementOrderLink(value.engagement_order)
  }
  return value?.link || ''
}

async function batchPostponeEngagementRunsForLink(
  supabase: SupabaseClient,
  normalizedLink: string,
  scheduledAt: string,
  reason: string,
) {
  if (!normalizedLink) return 0

  const { data: dueRuns, error: dueRunsError } = await supabase
    .from('organic_run_schedule')
    .select('id, engagement_order_item:engagement_order_items!inner(engagement_order:engagement_orders!inner(link))')
    .eq('status', 'pending')
    .not('engagement_order_item_id', 'is', null)
    .lte('scheduled_at', new Date().toISOString())
    .limit(1000)

  if (dueRunsError || !dueRuns?.length) {
    if (dueRunsError) console.error('Failed to load due runs for batch postpone:', dueRunsError)
    return 0
  }

  const matchingIds = dueRuns
    .filter((dueRun: any) => normalizeLink(dueRun.engagement_order_item?.engagement_order?.link) === normalizedLink)
    .map((dueRun: any) => dueRun.id)

  if (matchingIds.length === 0) return 0

  const { data: updatedRuns, error: updateError } = await supabase
    .from('organic_run_schedule')
    .update({
      scheduled_at: scheduledAt,
      error_message: reason,
      last_status_check: new Date().toISOString(),
    })
    .in('id', matchingIds)
    .select('id')

  if (updateError) {
    console.error('Failed to batch postpone matching runs:', updateError)
    return 0
  }

  return updatedRuns?.length || 0
}

async function updateEngagementOrderStatus(supabase: SupabaseClient, engagementOrderId: string, itemId: string) {
  if (!engagementOrderId) return

  const { data: parentOrder } = await supabase
    .from('engagement_orders')
    .select('status')
    .eq('id', engagementOrderId)
    .maybeSingle()

  if (parentOrder?.status === 'cancelled') return

  if (itemId) {
    const { data: currentItem } = await supabase
      .from('engagement_order_items')
      .select('status')
      .eq('id', itemId)
      .maybeSingle()

    if (currentItem?.status !== 'cancelled') {
      const { data: itemRuns } = await supabase
        .from('organic_run_schedule')
        .select('status')
        .eq('engagement_order_item_id', itemId)

      if (itemRuns && itemRuns.length > 0) {
        const completedCount = itemRuns.filter((r: any) => r.status === 'completed').length
        const failedCount = itemRuns.filter((r: any) => r.status === 'failed').length
        const totalRuns = itemRuns.length

        let itemStatus = 'processing'
        if (completedCount === totalRuns) itemStatus = 'completed'
        else if (completedCount + failedCount === totalRuns) itemStatus = failedCount > 0 ? 'partial' : 'completed'

        await supabase.from('engagement_order_items').update({ status: itemStatus }).eq('id', itemId)
      }
    }
  }

  const { data: allItems } = await supabase
    .from('engagement_order_items')
    .select('status')
    .eq('engagement_order_id', engagementOrderId)

  if (!allItems || allItems.length === 0) return

  const completedItems = allItems.filter((i: any) => i.status === 'completed').length
  const failedItems = allItems.filter((i: any) => i.status === 'failed').length
  const totalItems = allItems.length

  let orderStatus = 'processing'
  if (completedItems === totalItems) orderStatus = 'completed'
  else if (completedItems + failedItems === totalItems && failedItems > 0) orderStatus = 'partial'
  else if (failedItems === totalItems) orderStatus = 'failed'

  await supabase.from('engagement_orders').update({ status: orderStatus }).eq('id', engagementOrderId).neq('status', 'cancelled')
}

serve(async (req) => {
  const startTime = Date.now()
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Auth check
    const authHeader = req.headers.get('Authorization')
    const supabase = supabaseModule

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
      const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      const isSystemCall = (anonKey && token === anonKey) || (serviceKey && token === serviceKey)
      
      if (!isSystemCall) {
        const parts = token.split('.')
        if (parts.length === 3) {
          try {
            const payload = JSON.parse(atob(parts[1]))
            if (payload.role !== 'anon' && payload.role !== 'service_role' && !payload.sub) {
              return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              })
            }
          } catch {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
              status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
          }
        } else {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
      }
    } else if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const now = new Date().toISOString()
    const executionId = crypto.randomUUID().slice(0, 8)
    console.log(`=== EXECUTE ALL ORGANIC RUNS [${executionId}] ===`)

    let processed = 0
    let skipped = 0
    let failed = 0
    let retried = 0
    const results: any[] = []

    // ==========================================
    // OPTIMIZATION: Single mapping cache for entire invocation
    // ==========================================
    const mappingCache = new MappingCache()

    // ==========================================
    // PRE-FETCH ALL DATA IN PARALLEL (batch queries)
    // ==========================================
    const nowWithBuffer = new Date(Date.now() + 2000).toISOString()
    const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString()

    const [
      { data: activeRuns },
      { data: globalStuckRuns },
      { data: pendingEngagementRuns, error: engagementRunsError },
      { data: failedEngagementRuns },
      { data: recentlyBusyRuns },
    ] = await Promise.all([
      // 1. Active runs for conflict detection
      supabase
        .from('organic_run_schedule')
        .select('*, engagement_order_item:engagement_order_items(engagement_type, service_id, engagement_order:engagement_orders(link))')
        .eq('status', 'started'),
      // 2. Stuck runs for cleanup
      supabase
        .from('organic_run_schedule')
        .select('id, run_number, started_at, provider_account_id, provider_status, provider_order_id')
        .eq('status', 'started')
        .or(`started_at.lt.${tenMinAgo},started_at.is.null`),
      // 3. Pending engagement runs
      supabase
        .from('organic_run_schedule')
        .select(`*, engagement_order_item:engagement_order_items(*, service:services(*), engagement_order:engagement_orders(*))`)
        .eq('status', 'pending')
        .not('engagement_order_item_id', 'is', null)
        .lte('scheduled_at', nowWithBuffer)
        .order('run_number', { ascending: true })
        .limit(1000),
      // 4. Failed engagement runs for retry
      supabase
        .from('organic_run_schedule')
        .select(`*, engagement_order_item:engagement_order_items(*, service:services(*), engagement_order:engagement_orders(*))`)
        .eq('status', 'failed')
        .lt('retry_count', 99)
        .not('engagement_order_item_id', 'is', null)
        .order('completed_at', { ascending: true })
        .limit(50),
      // 5. Recently busy runs (for cooldown)
      supabase
        .from('organic_run_schedule')
        .select(`provider_account_id, error_message, engagement_order_item:engagement_order_items(engagement_order:engagement_orders(link))`)
        .eq('status', 'pending')
        .gte('last_status_check', fifteenMinAgo),
    ])

    // ==========================================
    // STEP 0: GLOBAL CLEANUP (stuck runs)
    // ==========================================
    if (globalStuckRuns && globalStuckRuns.length > 0) {
      console.log(`🧹 Cleaning ${globalStuckRuns.length} stuck runs`)
      // Batch cleanup in parallel
      const cleanupPromises = globalStuckRuns.map(stuck => {
        const startedTime = stuck.started_at ? new Date(stuck.started_at).getTime() : Date.now() - 11 * 60 * 1000
        const ageMin = Math.round((Date.now() - startedTime) / 60000)
        
        if (!stuck.provider_order_id) {
          return supabase.from('organic_run_schedule').update({
            status: 'pending', started_at: null, provider_account_id: null,
            error_message: `Ghost run reverted after ${ageMin}min`,
          }).eq('id', stuck.id)
        } else {
          return supabase.from('organic_run_schedule').update({
            status: 'completed', completed_at: new Date().toISOString(),
            provider_status: stuck.provider_status || 'Stale',
            error_message: `Auto-completed after ${ageMin}min (status: ${stuck.provider_status || 'unknown'})`,
          }).eq('id', stuck.id)
        }
      })
      await Promise.all(cleanupPromises)
      console.log(`✅ Cleaned ${globalStuckRuns.length} stuck runs`)
    }

    // ==========================================
    // STEP 1: Process ENGAGEMENT ORDER runs
    // ==========================================
    console.log(`\n--- Processing Engagement Order Runs ---`)

    if (engagementRunsError) {
      console.error('Error fetching engagement runs:', engagementRunsError)
    }

    // PRE-FILTER: Remove paused/cancelled
    const activeEngagementRuns = (pendingEngagementRuns || []).filter(run => {
      const orderStatus = run.engagement_order_item?.engagement_order?.status
      const itemStatus = run.engagement_order_item?.status
      if (orderStatus === 'paused' || orderStatus === 'cancelled') return false
      if (itemStatus === 'paused' || itemStatus === 'cancelled') return false
      return true
    })

    // Deduplicate: max 3 concurrent per item
    const itemRunCount = new Map<string, number>()
    const MAX_CONCURRENT_PER_ITEM = 3
    const executionProviderMap = new Map<string, Set<string>>()
    // Track link+type combos where ALL providers returned "active order" — only skip same type
    const activeOrderLinkTypes = new Set<string>()
    
    const deduplicatedRuns = activeEngagementRuns.filter(run => {
      const itemId = run.engagement_order_item_id
      const count = itemRunCount.get(itemId) || 0
      if (count < MAX_CONCURRENT_PER_ITEM) {
        itemRunCount.set(itemId, count + 1)
        return true
      }
      return false
    })

    // PRE-FILTER failed runs
    const activeFailedRuns = (failedEngagementRuns || []).filter(run => {
      const orderStatus = run.engagement_order_item?.engagement_order?.status
      const itemStatus = run.engagement_order_item?.status
      if (orderStatus === 'cancelled' || orderStatus === 'paused') return false
      if (itemStatus === 'cancelled' || itemStatus === 'paused') return false
      return true
    })

    const allEngagementRuns = [...deduplicatedRuns, ...activeFailedRuns]
    console.log(`Processing ${allEngagementRuns.length} runs (${deduplicatedRuns.length} pending + ${activeFailedRuns.length} retry), total overdue in DB: check query`)

    // PRE-BUILD busy account lookup for recently busy runs (link → Set<accountId>)
    const recentlyBusyByLink = new Map<string, Set<string>>()
    if (recentlyBusyRuns && recentlyBusyRuns.length > 0) {
      for (const rbr of recentlyBusyRuns) {
        if (!rbr.provider_account_id) continue
        const err = (rbr.error_message || '').toLowerCase()
        const isBusyError = err.includes('active order') || err.includes('already has an order') || 
          err.includes('wait until') || err.includes('processing previous') || err.includes('in progress')
        if (isBusyError) {
          const rbrLink = normalizeLink(getNestedEngagementOrderLink(rbr.engagement_order_item))
          if (!recentlyBusyByLink.has(rbrLink)) recentlyBusyByLink.set(rbrLink, new Set())
          recentlyBusyByLink.get(rbrLink)!.add(rbr.provider_account_id)
        }
      }
    }

    // Process each engagement run
    for (const run of allEngagementRuns) {
      // Timeout guard: if we've been running for 50s, stop to avoid edge function timeout
      if (Date.now() - startTime > 50000) {
        console.log(`⏰ Approaching timeout (${Date.now() - startTime}ms), stopping processing. Remaining runs will be picked up next cycle.`)
        break
      }

      // FAST SKIP: If we already know this link+type has "active order" on all providers, skip immediately
      const runLink = normalizeLink(run.engagement_order_item?.engagement_order?.link)
      const runType = (run.engagement_order_item?.engagement_type || '').toLowerCase()
      const linkTypeKey = `${runLink}|${runType}`
      if (runLink && activeOrderLinkTypes.has(linkTypeKey)) {
        skipped++
        continue
      }

      const isRetry = run.status === 'failed'
      const item = run.engagement_order_item
      if (!item) {
        await supabase.from('organic_run_schedule').update({
          status: 'failed', error_message: 'Missing engagement order item',
        }).eq('id', run.id)
        failed++
        continue
      }

      const currentType = item.engagement_type?.toLowerCase()
      const engagementOrderStatus = item.engagement_order?.status
      const itemStatus = item.status
      
      // CANCELLED = PERMANENT
      if (engagementOrderStatus === 'cancelled') {
        await supabase.from('organic_run_schedule').update({
          status: 'cancelled', error_message: 'Order cancelled by user',
          completed_at: new Date().toISOString(),
        }).eq('id', run.id)
        skipped++
        continue
      }
      if (itemStatus === 'cancelled') {
        await supabase.from('organic_run_schedule').update({
          status: 'cancelled', error_message: 'Item cancelled by user',
          completed_at: new Date().toISOString(),
        }).eq('id', run.id)
        skipped++
        continue
      }
      
      // PAUSED = TEMPORARY
      if (engagementOrderStatus === 'paused' || itemStatus === 'paused') {
        skipped++
        continue
      }

      if (!item.service) {
        // FALLBACK: Try bundle
        const bundleId = item.engagement_order?.bundle_id
        if (bundleId) {
          const { data: bundleItem } = await supabase
            .from('bundle_items')
            .select('service_id, service:services(*)')
            .eq('bundle_id', bundleId)
            .eq('engagement_type', item.engagement_type)
            .not('service_id', 'is', null)
            .limit(1).single()
          
          if (bundleItem?.service) {
            item.service = bundleItem.service
            await supabase.from('engagement_order_items')
              .update({ service_id: bundleItem.service_id })
              .eq('id', item.id)
          }
        }
        
        if (!item.service) {
          const retryCount = (run.retry_count || 0) + 1
          if (retryCount >= MAX_RUN_RETRIES) {
            await supabase.from('organic_run_schedule').update({
              status: 'failed', error_message: `Service not found after ${MAX_RUN_RETRIES} retries`,
              retry_count: 99,
            }).eq('id', run.id)
            failed++
          } else {
            await supabase.from('organic_run_schedule').update({
              status: 'failed', error_message: 'Service not found - will retry',
              retry_count: retryCount,
            }).eq('id', run.id)
            skipped++
          }
          continue
        }
      }

      // Platform mismatch detection
      const orderLink = item.engagement_order?.link || ''
      const linkPlatform = detectPlatformFromLink(orderLink)
      const servicePlatform = detectPlatformFromService(item.service.name || '')
      
      if (linkPlatform && servicePlatform && linkPlatform !== servicePlatform) {
        await supabase.from('organic_run_schedule').update({
          status: 'failed',
          error_message: `BLOCKED: Platform mismatch - ${linkPlatform} link cannot use ${servicePlatform} service`,
          completed_at: new Date().toISOString(), retry_count: 99,
        }).eq('id', run.id)
        failed++
        continue
      }

      const sameLink = normalizeLink(orderLink)
      const currentServiceId = item.service?.id
      const sameLinkNormalized = sameLink
      const currentTypeNormalized = currentType.toLowerCase().trim()
      const localExecutionKey = `${sameLinkNormalized}|${currentTypeNormalized}`
      
      // Build busy account list
      const busyAccountIds: string[] = []
      
      // From execution-level tracking
      const usedProvidersForKey = executionProviderMap.get(localExecutionKey) || new Set<string>()
      for (const usedId of usedProvidersForKey) {
        if (!busyAccountIds.includes(usedId)) busyAccountIds.push(usedId)
      }
      
      // From pre-fetched recently busy runs
      const busyForLink = recentlyBusyByLink.get(sameLink)
      if (busyForLink) {
        for (const accId of busyForLink) {
          if (!busyAccountIds.includes(accId)) busyAccountIds.push(accId)
        }
      }
      
      // From active (started) runs for same link+service
      const startedRunsForLink = (activeRuns || []).filter((r: any) => {
        const runLink = normalizeLink(r.engagement_order_item?.engagement_order?.link)
        const runServiceId = r.engagement_order_item?.service_id || ''
        return runLink === sameLink && runServiceId === currentServiceId
      })
      
      if (startedRunsForLink && startedRunsForLink.length > 0) {
        for (const stuckRun of startedRunsForLink) {
          const terminalStatuses = ['Completed', 'Complete', 'Partial', 'Refunded', 'Canceled', 'Cancelled', 'Error', 'Failed', 'Success', 'Refund', 'Canscelled']
          const isTerminal = stuckRun.provider_status && terminalStatuses.includes(stuckRun.provider_status)
          const hasNoRemains = typeof stuckRun.provider_remains === 'number' && stuckRun.provider_remains <= 0 && !!stuckRun.provider_order_id
          
          const startedAt = new Date(stuckRun.started_at || 0)
          const runAge = Math.round((Date.now() - startedAt.getTime()) / 1000)
          
          if (isTerminal || hasNoRemains) {
            console.log(`🔄 Auto-completing run #${stuckRun.run_number} (${hasNoRemains ? 'no remains left' : `terminal: ${stuckRun.provider_status}`})`)
            await supabase.from('organic_run_schedule').update({
              status: 'completed', completed_at: new Date().toISOString(),
              error_message: hasNoRemains
                ? `Auto-completed (provider remains reached 0)`
                : `Auto-completed (status: ${stuckRun.provider_status})`,
            }).eq('id', stuckRun.id)
          } else if (stuckRun.provider_account_id) {
            if (!stuckRun.provider_order_id && runAge > 60) {
              await supabase.from('organic_run_schedule').update({
                status: 'pending', started_at: null, provider_account_id: null,
                error_message: `Ghost run reverted (no provider order after ${runAge}s)`,
              }).eq('id', stuckRun.id)
              continue
            }
            
            if (!stuckRun.provider_order_id && runAge <= 60) {
              if (!busyAccountIds.includes(stuckRun.provider_account_id)) {
                busyAccountIds.push(stuckRun.provider_account_id)
              }
              continue
            }
            
            if (!busyAccountIds.includes(stuckRun.provider_account_id)) {
              busyAccountIds.push(stuckRun.provider_account_id)
            }
          }
        }
      }

      // ==========================================
      // OPTIMIZED: Use cached mapping lookup
      // ==========================================
      const availableAccounts = await mappingCache.getForService(
        supabase, item.service.id, busyAccountIds, executionId
      )
      
      // Default provider fallback
      let defaultProvider: ProviderAccount | null = null
      if (item.service.provider_id && isValidUUID(item.service.provider_id)) {
        const { data: provider } = await supabase
          .from('providers').select('*')
          .eq('id', item.service.provider_id).single()
        
        if (provider && isValidUUID(provider.id)) {
          defaultProvider = {
            id: provider.id, provider_id: provider.id, name: provider.name,
            api_key: provider.api_key, api_url: provider.api_url,
            priority: 999, is_active: provider.is_active, last_used_at: null
          }
        }
      }
      
      const accountsToTry: { account: ProviderAccount; providerServiceId: string }[] = [...availableAccounts]
      if (defaultProvider && !accountsToTry.some(a => a.account.id === defaultProvider!.id)) {
        accountsToTry.push({ account: defaultProvider, providerServiceId: item.service.provider_service_id })
      }
      
      if (accountsToTry.length === 0) {
        if (mappingCache.hasAnyForService(item.service.id)) {
          // POSTPONE: All providers busy — push scheduled_at forward so we don't waste cycles
          const postponeMs = ACTIVE_ORDER_RETRY_MS
          const newScheduledAt = new Date(Date.now() + postponeMs).toISOString()
          await supabase.from('organic_run_schedule').update({
            scheduled_at: newScheduledAt,
            error_message: `[Postponed] All providers busy for this link`,
            last_status_check: new Date().toISOString(),
          }).eq('id', run.id)
          skipped++
          console.log(`⏳ Run #${run.run_number} postponed ${postponeMs / 60000}min (all providers pre-filtered as busy)`)
          results.push({ run_id: run.id, run_number: run.run_number, type: item.engagement_type,
            success: false, skipped: true, reason: `All providers busy - postponed ${postponeMs / 60000}min` })
        } else {
          await supabase.from('organic_run_schedule').update({
            status: 'failed', error_message: 'No provider accounts configured',
          }).eq('id', run.id)
          failed++
        }
        continue
      }

      // Quantity handling — ALWAYS boost to provider minimum to avoid repeated rejections
      let quantityToSend = run.quantity_to_send
      const serviceMinQty = item.service.min_quantity || 10
      // Use at least 100 as absolute floor (most providers require this)
      const effectiveMin = Math.max(serviceMinQty, 100)
      
      if (quantityToSend < effectiveMin) {
        console.log(`📏 Run #${run.run_number}: qty ${quantityToSend} below min ${effectiveMin}, boosting`)
        quantityToSend = effectiveMin
        await supabase.from('organic_run_schedule')
          .update({ quantity_to_send: quantityToSend })
          .eq('id', run.id)
      }

      console.log(`🔄 Run #${run.run_number}: ${quantityToSend} ${item.engagement_type}, trying ${accountsToTry.length} accounts`)

      // Try each account
      let success = false
      let lastError: string | null = null
      let providerOrderId: string | null = null
      let providerResult: any = null
      let successAccount: ProviderAccount | null = null
      let verifiedStatus: string | null = null
      let verifiedRemains: number | null = null
      let verifiedStartCount: number | null = null
      let verifiedCharge: number | null = null
      let verifiedLastStatusCheck: string | null = null
      
      for (const { account: selectedAccount, providerServiceId } of accountsToTry) {
        // PRE-CHECK: Cancel check
        {
          const { data: freshItem } = await supabase
            .from('engagement_order_items')
            .select('status, engagement_order:engagement_orders(status)')
            .eq('id', item.id).single()
          
          const freshOrderStatus = (freshItem as any)?.engagement_order?.status
          const freshItemStatus = freshItem?.status
          
          if (freshOrderStatus === 'cancelled' || freshItemStatus === 'cancelled') {
            await supabase.from('organic_run_schedule').update({
              status: 'cancelled', error_message: 'Cancelled before provider send',
              completed_at: new Date().toISOString(),
            }).eq('id', run.id)
            skipped++
            break
          }
        }

        // Balance check
        const { hasBalance, balance: providerBalance } = await checkProviderBalance(selectedAccount)
        if (!hasBalance) {
          lastError = `Provider ${selectedAccount.name} has no balance`
          continue
        }
        const estimatedCost = quantityToSend * 0.0001
        if (providerBalance >= 0 && providerBalance < estimatedCost) {
          lastError = `Provider ${selectedAccount.name} balance too low (${providerBalance})`
          continue
        }
        
        // Atomic lock
        const currentStatus = isRetry ? 'failed' : 'pending'
        const { error: updateError, count: lockCount } = await supabase
          .from('organic_run_schedule')
          .update({
            status: 'started', started_at: new Date().toISOString(),
            error_message: `Trying ${selectedAccount.name}...`,
            retry_count: (run.retry_count || 0) + (isRetry ? 1 : 0),
            provider_order_id: null, provider_status: null, provider_response: null,
            provider_account_id: selectedAccount.id,
            provider_account_name: selectedAccount.name,
          })
          .eq('id', run.id)
          .eq('status', currentStatus)

        if (updateError || lockCount === 0) {
          break
        }

        await updateAccountLastUsed(supabase, selectedAccount.id)

        try {
          const formData = new URLSearchParams()
          formData.append('key', selectedAccount.api_key)
          formData.append('action', 'add')
          formData.append('service', providerServiceId)
          formData.append('link', item.engagement_order.link)
          formData.append('quantity', quantityToSend.toString())

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000)

          const response = await fetch(selectedAccount.api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(),
            signal: controller.signal,
          })

          clearTimeout(timeoutId)
          const responseText = await response.text()
          console.log(`Provider response from ${selectedAccount.name}: ${responseText}`)

          let result
          try { result = JSON.parse(responseText) } catch { result = { error: responseText } }

          if (result.status === 'fail' || result.error) {
            lastError = result.message || result.error
            if (lastError === null || lastError === undefined) lastError = 'Unknown provider error'
            if (typeof lastError !== 'string') lastError = JSON.stringify(lastError)
            providerResult = result
            
            const isActiveOrderError = lastError.toLowerCase().includes('active order') || 
              lastError.toLowerCase().includes('wait until order')
            if (isActiveOrderError) {
              await new Promise(resolve => setTimeout(resolve, 200))
              continue
            }
            
            const isTemporaryError = TEMPORARY_ERRORS.some(err => lastError!.toLowerCase().includes(err.toLowerCase()))
            if (isTemporaryError) {
              await new Promise(resolve => setTimeout(resolve, 200))
              continue
            }
            
            const isAccountSpecificError = ACCOUNT_SPECIFIC_ERRORS.some(err => lastError!.toLowerCase().includes(err.toLowerCase()))
            if (isAccountSpecificError) {
              await new Promise(resolve => setTimeout(resolve, 200))
              continue
            }
            
            const isTryNextProviderError = TRY_NEXT_PROVIDER_ERRORS.some(err => lastError!.toLowerCase().includes(err.toLowerCase()))
            if (isTryNextProviderError) {
              await new Promise(resolve => setTimeout(resolve, 200))
              continue
            }
            
            break
          } else {
            providerOrderId = result.order?.toString() || result.id?.toString() || null

            if (!providerOrderId) {
              lastError = 'Provider returned success but no order id'
              providerResult = result
              continue
            }

            const statusCheck = await checkProviderOrderStatusWithRetries({
              apiUrl: selectedAccount.api_url, apiKey: selectedAccount.api_key,
              providerOrderId, maxAttempts: 3, attemptDelayMs: 1500,
            })

            if (!statusCheck.ok) {
              lastError = `Verification failed: ${statusCheck.error}`
              providerResult = { add: result, verify_error: statusCheck.error, verify_raw: statusCheck.rawText }
              verifiedStatus = 'Pending Verification'
              successAccount = selectedAccount
              success = true
              break 
            }

            verifiedStatus = statusCheck.data?.status?.toString() || null
            const startCountParsed = parseInt(statusCheck.data?.start_count)
            verifiedStartCount = Number.isFinite(startCountParsed) ? startCountParsed : null
            const remainsParsed = parseInt(statusCheck.data?.remains)
            verifiedRemains = Number.isFinite(remainsParsed) ? remainsParsed : null
            const chargeParsed = parseFloat(statusCheck.data?.charge)
            verifiedCharge = Number.isFinite(chargeParsed) ? chargeParsed : null
            verifiedLastStatusCheck = new Date().toISOString()

            providerResult = { add: result, status: statusCheck.data }
            successAccount = selectedAccount
            success = true
            console.log(`✅ Run #${run.run_number} verified via ${selectedAccount.name}! Order ID: ${providerOrderId}`)
            break
          }
        } catch (fetchError: any) {
          lastError = 'Network error: ' + (fetchError.message || 'Unknown')
          await new Promise(resolve => setTimeout(resolve, 300))
          continue
        }
      }

      // Update run based on result
      if (success && providerOrderId && successAccount) {
        const { data: freshItemPostSend } = await supabase
          .from('engagement_order_items')
          .select('status, engagement_order:engagement_orders(status)')
          .eq('id', item.id).single()
        
        const postSendOrderStatus = (freshItemPostSend as any)?.engagement_order?.status
        const postSendItemStatus = freshItemPostSend?.status
        
        if (postSendOrderStatus === 'cancelled' || postSendItemStatus === 'cancelled') {
          await supabase.from('organic_run_schedule').update({
            status: 'cancelled', provider_order_id: providerOrderId,
            provider_response: providerResult,
            provider_account_id: successAccount.id, provider_account_name: successAccount.name,
            provider_status: verifiedStatus,
            error_message: `Order cancelled during send — provider order ${providerOrderId} may need manual cancellation`,
            completed_at: new Date().toISOString(), last_status_check: new Date().toISOString(),
          }).eq('id', run.id)
          skipped++
          continue
        }
        
        // Update run + item + order in parallel
        const providerDeliveredAll = verifiedRemains === 0 && !isFailedProviderStatus(verifiedStatus)
        const providerIsTerminal = isTerminalProviderStatus(verifiedStatus) || providerDeliveredAll

        const updatePromises = [
          supabase.from('organic_run_schedule').update({
            provider_order_id: providerOrderId, provider_response: providerResult,
            error_message: null, provider_account_id: successAccount.id,
            provider_account_name: successAccount.name, provider_status: verifiedStatus,
            provider_start_count: verifiedStartCount, provider_remains: verifiedRemains,
            provider_charge: verifiedCharge,
            ...(providerIsTerminal
              ? {
                  status: 'completed',
                  completed_at: new Date().toISOString(),
                  ...(providerDeliveredAll && !isTerminalProviderStatus(verifiedStatus)
                    ? { error_message: 'Auto-completed (provider remains reached 0)' }
                    : {}),
                }
              : {}),
            last_status_check: verifiedLastStatusCheck || new Date().toISOString(),
          }).eq('id', run.id).eq('status', 'started'),
          supabase.from('engagement_order_items').update({ status: 'processing' })
            .eq('id', item.id).not('status', 'in', '("cancelled","paused")'),
          supabase.from('engagement_orders').update({ status: 'processing' })
            .eq('id', item.engagement_order_id).not('status', 'in', '("cancelled","paused")'),
        ]
        
        const [runUpdateResult] = await Promise.all(updatePromises)
        
        if (runUpdateResult.count === 0) {
          skipped++
          continue
        }

        if (!executionProviderMap.has(localExecutionKey)) {
          executionProviderMap.set(localExecutionKey, new Set())
        }
        executionProviderMap.get(localExecutionKey)!.add(successAccount.id)

        processed++
        results.push({ 
          run_id: run.id, type: item.engagement_type, run_number: run.run_number,
          success: true, provider_order_id: providerOrderId,
          account_used: successAccount.name, accounts_tried: accountsToTry.length,
          status: providerIsTerminal ? 'completed' : 'started',
        })

        if (providerIsTerminal) {
          await updateEngagementOrderStatus(supabase, item.engagement_order_id, item.id)
        }
      } else {
        const retryCount = (run.retry_count || 0) + 1
        const lastErr = (lastError || '').toLowerCase()
        const isActiveOrderError = lastErr.includes('active order') || lastErr.includes('wait until order') || 
          lastErr.includes('already has an order') || lastErr.includes('in progress')
        
        const postponeMs = isActiveOrderError ? ACTIVE_ORDER_RETRY_MS : TEMPORARY_RETRY_MS
        const newScheduledAt = new Date(Date.now() + postponeMs).toISOString()
        
        await supabase.from('organic_run_schedule').update({
          status: 'pending', started_at: null,
          scheduled_at: newScheduledAt,
          error_message: `[Auto-retry #${retryCount}] All ${accountsToTry.length} accounts busy: ${lastError}`,
          provider_response: providerResult, provider_account_id: null,
          retry_count: retryCount, last_status_check: new Date().toISOString(),
        }).eq('id', run.id)
        skipped++

        // BATCH POSTPONE: If active order error, mark link and batch-postpone ALL pending runs for this link
        if (isActiveOrderError && sameLink) {
          activeOrderLinks.add(sameLink)
          const batchCount = await batchPostponeEngagementRunsForLink(
            supabase,
            sameLink,
            newScheduledAt,
            '[Batch postponed] Active order on link',
          )
          console.log(`⏳ Link batch-postponed ${postponeMs / 60000}min: ${batchCount} matching runs (active order)`)
        }
        results.push({ run_id: run.id, type: item.engagement_type, run_number: run.run_number, 
          success: false, error: lastError, will_retry: true, retry_attempt: retryCount, postponed_min: postponeMs / 60000 })
      }

      // Reduced delay between runs (was 500ms → 100ms)
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // ==========================================
    // STEP 2: Process LEGACY ORDER runs
    // ==========================================
    console.log(`\n--- Processing Legacy Order Runs ---`)
    
    const { data: legacyRuns } = await supabase
      .from('organic_run_schedule')
      .select(`*, order:orders(*, service:services(*))`)
      .eq('status', 'pending')
      .lte('scheduled_at', now)
      .not('order_id', 'is', null)
      .is('engagement_order_item_id', null)
      .order('scheduled_at', { ascending: true })
      .limit(10)

    console.log(`Found ${legacyRuns?.length || 0} pending legacy runs`)

    for (const run of legacyRuns || []) {
      if (Date.now() - startTime > 55000) {
        console.log(`⏰ Approaching timeout, stopping legacy processing.`)
        break
      }

      const order = run.order
      if (!order || !order.service) continue

      if (order.status === 'cancelled') {
        await supabase.from('organic_run_schedule').update({
          status: 'cancelled', error_message: 'Order cancelled by user',
          completed_at: new Date().toISOString(),
        }).eq('id', run.id)
        skipped++
        continue
      }
      
      if (order.status === 'paused') { skipped++; continue }

      const startedRunsForOrder = (activeRuns || []).filter((r: any) => r.order_id === order.id)

      if (startedRunsForOrder && startedRunsForOrder.length > 0) {
        const stuckRun = startedRunsForOrder[0]
        const terminalStatuses = ['Completed', 'Partial', 'Refunded', 'Canceled', 'Cancelled', 'Error', 'Failed']
        const isTerminal = stuckRun.provider_status && terminalStatuses.includes(stuckRun.provider_status)
        const startedAt = new Date(stuckRun.started_at || 0)
        const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000)
        const isStuckWithoutStatus = startedAt < twoMinutesAgo && !stuckRun.provider_status
        const isInProgressTooLong = startedAt < twoMinutesAgo && stuckRun.provider_status === 'In progress'
        const isPendingTooLong = startedAt < twoMinutesAgo && stuckRun.provider_status === 'Pending'
        
        if (isTerminal || isStuckWithoutStatus || isInProgressTooLong || isPendingTooLong) {
          await supabase.from('organic_run_schedule').update({
            status: 'completed', completed_at: new Date().toISOString(),
            error_message: `Auto-completed (status: ${stuckRun.provider_status || 'unknown'})`,
          }).eq('id', stuckRun.id)
        } else {
          const runAge = Math.round((Date.now() - startedAt.getTime()) / 1000)
          if (runAge < 60) { skipped++; continue }
        }
      }

      const { data: provider } = await supabase
        .from('providers').select('*')
        .eq('id', order.service.provider_id).single()

      if (!provider) {
        await supabase.from('organic_run_schedule').update({
          status: 'failed', error_message: 'Provider not found',
        }).eq('id', run.id)
        failed++
        continue
      }

      const { error: updateError } = await supabase
        .from('organic_run_schedule')
        .update({ status: 'started', started_at: new Date().toISOString() })
        .eq('id', run.id).eq('status', 'pending')

      if (updateError) continue

      let lastError: string | null = null
      let providerOrderId: string | null = null

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const formData = new URLSearchParams()
          formData.append('key', provider.api_key)
          formData.append('action', 'add')
          formData.append('service', order.service.provider_service_id)
          formData.append('link', order.link)
          formData.append('quantity', run.quantity_to_send.toString())

          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000)
          const response = await fetch(provider.api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString(), signal: controller.signal,
          })
          clearTimeout(timeoutId)
          const result = await response.json().catch(() => ({ error: 'Invalid response' }))

          if (result.status === 'fail' || result.error) {
            lastError = result.message || result.error
            if (typeof lastError !== 'string') lastError = JSON.stringify(lastError)
            const isTemporaryError = TEMPORARY_ERRORS.some(err => lastError!.toLowerCase().includes(err.toLowerCase()))
            if (isTemporaryError) { lastError = `TEMP_ERROR: ${lastError}`; break }
            if (attempt < MAX_RETRIES) {
              await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
              retried++; continue
            }
          } else {
            providerOrderId = result.order?.toString() || result.id?.toString()
            break
          }
        } catch (fetchError: any) {
          lastError = 'Network error'
          if (attempt < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
            retried++
          }
        }
      }

      if (providerOrderId) {
        await supabase.from('organic_run_schedule').update({ provider_order_id: providerOrderId }).eq('id', run.id)
        await supabase.from('orders').update({ status: 'processing' }).eq('id', order.id)
        processed++
      } else {
        const isTemporaryError = lastError?.startsWith('TEMP_ERROR:')
        if (isTemporaryError) {
          const cleanError = lastError?.replace('TEMP_ERROR: ', '') || ''
          const isActiveOrder = cleanError.toLowerCase().includes('active order') || cleanError.toLowerCase().includes('wait until order')
          const postponeMs = isActiveOrder ? ACTIVE_ORDER_RETRY_MS : TEMPORARY_RETRY_MS
          await supabase.from('organic_run_schedule').update({
            status: 'pending', started_at: null,
            scheduled_at: new Date(Date.now() + postponeMs).toISOString(),
            error_message: `[Will retry] ${cleanError}`,
          }).eq('id', run.id)
          skipped++
        } else {
          await supabase.from('organic_run_schedule').update({
            status: 'failed', error_message: lastError || 'Failed after retries',
          }).eq('id', run.id)
          failed++
        }
      }
    }

    const totalTime = Date.now() - startTime
    console.log(`\n=== EXECUTION COMPLETE [${executionId}] in ${totalTime}ms ===`)
    console.log(`Processed: ${processed}, Skipped: ${skipped}, Failed: ${failed}, Retried: ${retried}`)

    // Send admin alert if failures
    if (failed > 0) {
      try {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-admin-alert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}` },
          body: JSON.stringify({
            job_name: 'execute-all-runs', execution_id: executionId,
            failed_count: failed, processed_count: processed, skipped_count: skipped,
            error_details: results.filter(r => !r.success).slice(0, 10).map(r => ({
              run_id: r.run_id, run_number: r.run_number, type: r.type, error: r.error
            }))
          })
        })
      } catch (alertError) {
        console.error('Failed to send admin alert:', alertError)
      }
    }

    return new Response(JSON.stringify({
      success: true, execution_id: executionId,
      processed, skipped, failed, retried,
      results: results.slice(0, 50), // Limit response size
      debug: { execution_time_ms: totalTime }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error: any) {
    console.error('Execution error:', error)
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
