import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Copy, CheckCircle2, AlertTriangle, Loader2, ShieldCheck,
  ArrowLeft, ArrowRight, Zap, Wallet,
  RefreshCw, Send
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const DEPOSIT_WALLET = '0xA07b34C582F31e70110C59faD70C0395a5BD339f';
const TELEGRAM_SUPPORT = "https://t.me/whopcampaign";

export default function InlineDepositCard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [step, setStep] = useState<'amount' | 'pay' | 'verify' | 'done'>('amount');

  const copyAddress = () => {
    navigator.clipboard.writeText(DEPOSIT_WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Address Copied', description: 'USDT (BEP20) address copied.' });
  };

  const handleVerify = async () => {
    if (!amount || Number(amount) < 1) {
      toast({ title: 'Invalid amount', description: 'Minimum deposit is $1', variant: 'destructive' });
      return;
    }
    if (!txHash || !/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
      toast({ title: 'Invalid TX hash', description: 'Enter a valid BSC transaction hash (0x + 64 hex chars)', variant: 'destructive' });
      return;
    }

    setVerifying(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-usdt-deposit', {
        body: { txHash, claimedAmount: Number(amount) },
      });

      let actualError: string | null = data?.error || null;
      if (!actualError && error) {
        try {
          const body = await (error as any).context?.json?.();
          actualError = body?.error || null;
        } catch { }
        actualError = actualError || error.message;
      }
      if (actualError) throw new Error(actualError);

      toast({ title: '✅ Deposit Verified!', description: `$${Number(data.amount).toFixed(2)} USDT added.` });
      setStep('done');
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    } catch (err: any) {
      const msg = err.message || 'Could not verify';
      const friendly = msg.includes('already processed') ? '⚠️ Already credited.'
        : msg.includes('not found on BSC') ? '⏳ Not found yet. Wait 2-3 min.'
        : msg.includes('failed on chain') ? '❌ Transaction failed on BSC.'
        : msg.includes('Amount mismatch') ? `❌ ${msg}`
        : msg.includes('No USDT BEP20') ? '❌ No USDT transfer found. Check BEP20.'
        : `❌ ${msg}`;
      toast({ title: 'Verification Failed', description: friendly, variant: 'destructive' });
    } finally {
      setVerifying(false);
    }
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(DEPOSIT_WALLET)}&bgcolor=ffffff&color=000000&margin=20`;

  return (
    <div className="max-w-lg mx-auto">
      <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', boxShadow: '0 2px 16px rgba(0,0,0,.04)' }}>

        {/* Header */}
        <div className="p-5 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,0,0,.04)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,.1)' }}>
              <Zap className="h-5 w-5" style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold" style={{ color: '#1a1a2e' }}>USDT Deposit</h2>
              <p className="text-[10px] font-medium" style={{ color: '#3b82f6' }}>BSC (BEP20) • Auto Verify</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold" style={{ background: 'rgba(59,130,246,.08)', color: '#3b82f6', border: '1px solid rgba(59,130,246,.12)' }}>
            <ShieldCheck className="h-3 w-3" /> Auto
          </div>
        </div>

        {/* Step indicator */}
        {step !== 'done' && (
          <div className="flex items-center gap-1.5 px-5 pt-4">
            {['amount', 'pay', 'verify'].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 flex-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all" style={{
                  background: step === s ? '#3b82f6' : ['amount', 'pay', 'verify'].indexOf(step) > i ? 'rgba(59,130,246,.15)' : 'rgba(0,0,0,.04)',
                  color: step === s ? 'white' : ['amount', 'pay', 'verify'].indexOf(step) > i ? '#3b82f6' : '#ccc',
                }}>
                  {['amount', 'pay', 'verify'].indexOf(step) > i ? <CheckCircle2 className="h-3 w-3" /> : i + 1}
                </div>
                {i < 2 && <div className="flex-1 h-[1.5px] rounded-full" style={{ background: ['amount', 'pay', 'verify'].indexOf(step) > i ? 'rgba(59,130,246,.3)' : 'rgba(0,0,0,.06)' }} />}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: Amount */}
        {step === 'amount' && (
          <div className="p-5 space-y-5">
            <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,.03)', border: '1px solid rgba(59,130,246,.08)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="h-4 w-4" style={{ color: '#3b82f6' }} />
                <span className="text-[11px] font-medium" style={{ color: '#888' }}>Enter USDT amount. Min deposit: $1</span>
              </div>
              <div>
                <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#888' }}>Claim Amount (USDT)</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold" style={{ color: '#3b82f6' }}>$</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9 h-14 rounded-xl text-xl font-bold"
                    style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.08)', color: '#1a1a2e' }}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep('pay')}
              disabled={!amount || Number(amount) < 1}
              className="w-full h-13 rounded-xl text-[14px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 16px rgba(59,130,246,.25)' }}
            >
              <ArrowRight className="h-4 w-4 mr-2" /> Get Wallet Address
            </Button>
          </div>
        )}

        {/* STEP 2: Send USDT */}
        {step === 'pay' && (
          <div className="p-5 space-y-4">
            <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: 'rgba(245,158,11,.05)', border: '1px solid rgba(245,158,11,.1)' }}>
              <AlertTriangle className="h-4 w-4 flex-shrink-0" style={{ color: '#f59e0b' }} />
              <p className="text-[10px] font-medium" style={{ color: '#d97706' }}>
                Send <strong>USDT (BEP20) only</strong>. Other networks = loss.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl" style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.04)' }}>
              <div className="flex-shrink-0 flex items-center justify-center cursor-pointer" onClick={copyAddress}>
                <img src={qrSrc} alt="QR" className="w-24 h-24 rounded-xl" style={{ border: '1px solid rgba(0,0,0,.08)', padding: '6px', background: 'white' }} />
              </div>
              <div className="flex-1 space-y-2 flex flex-col justify-center">
                <p className="text-[10px] font-medium" style={{ color: '#999' }}>BSC Wallet Address</p>
                <div onClick={copyAddress} className="flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-colors" style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.06)' }}>
                  <code className="text-[11px] font-semibold break-all flex-1" style={{ color: '#1a1a2e' }}>{DEPOSIT_WALLET}</code>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,.1)' }}>
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#10b981' }} /> : <Copy className="h-3.5 w-3.5" style={{ color: '#3b82f6' }} />}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold" style={{ background: 'rgba(16,185,129,.08)', color: '#10b981' }}>10+ Blocks</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold" style={{ background: 'rgba(59,130,246,.08)', color: '#3b82f6' }}>BEP20</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep('verify')}
              className="w-full h-12 rounded-xl text-[13px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              <ArrowRight className="h-4 w-4 mr-2" /> Submit TX Hash
            </Button>
            <button onClick={() => setStep('amount')} className="text-[11px] font-medium flex items-center gap-1 mx-auto" style={{ color: '#bbb' }}>
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </div>
        )}

        {/* STEP 3: Verify */}
        {step === 'verify' && (
          <div className="p-5 space-y-4">
            <div className="p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(59,130,246,.03)', border: '1px solid rgba(59,130,246,.08)' }}>
              <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#3b82f6' }} />
              <div>
                <p className="text-[12px] font-semibold" style={{ color: '#1a1a2e' }}>Auto Verification</p>
                <p className="text-[10px]" style={{ color: '#888' }}>Paste the <strong style={{ color: '#3b82f6' }}>TXID Hash</strong> to verify.</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold mb-1.5" style={{ color: '#888' }}>TXID Hash *</p>
              <Input
                placeholder="0x..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                className="font-mono text-[12px] h-12 rounded-xl"
                style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.08)', color: '#1a1a2e' }}
              />
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px]" style={{ color: '#bbb' }}>Value: <strong style={{ color: '#3b82f6' }}>${amount} USDT</strong></span>
                <button onClick={() => setStep('pay')} className="text-[10px] flex items-center gap-1" style={{ color: '#bbb' }}>
                  <RefreshCw className="h-2.5 w-2.5" /> Retry
                </button>
              </div>
            </div>

            <Button
              onClick={handleVerify}
              disabled={verifying || !txHash}
              className="w-full h-12 rounded-xl text-[13px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
            >
              {verifying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
              {verifying ? 'Verifying...' : 'Verify & Credit'}
            </Button>

            <button onClick={() => setStep('pay')} className="text-[11px] font-medium flex items-center gap-1 mx-auto" style={{ color: '#bbb' }}>
              <ArrowLeft className="h-3 w-3" /> Back
            </button>
          </div>
        )}

        {/* STEP 4: Done */}
        {step === 'done' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(59,130,246,.1)' }}>
              <CheckCircle2 className="h-8 w-8" style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>Verified!</h3>
              <p className="text-[12px] mt-1" style={{ color: '#3b82f6' }}>TXID Confirmed</p>
            </div>
            <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: 'rgba(16,185,129,.05)', border: '1px solid rgba(16,185,129,.1)' }}>
              <span className="text-[11px] font-medium" style={{ color: '#888' }}>Added</span>
              <span className="text-[16px] font-bold" style={{ color: '#10b981' }}>${amount} USDT</span>
            </div>
            <Button
              onClick={() => { setStep('amount'); setAmount(''); setTxHash(''); }}
              className="w-full h-11 rounded-xl font-semibold text-white"
              style={{ background: '#3b82f6' }}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Support */}
        <div className="px-5 pb-5">
          <a href={TELEGRAM_SUPPORT} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl transition-colors"
            style={{ background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.04)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
              <span className="text-[11px] font-medium" style={{ color: '#999' }}>Need help?</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: '#0ea5e9' }}>
              <Send className="h-3 w-3" /> Telegram Support
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
