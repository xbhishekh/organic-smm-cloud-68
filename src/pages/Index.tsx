import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Shield,
  Clock,
  Rocket,
  Sparkles,
  BarChart3,
  Zap,
  Activity,
  TrendingUp,
  Eye,
  Heart,
  Users,
  Star,
  CheckCircle2,
  Globe,
  Play,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  Send,
} from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Index = () => {
  return (
    <main className="min-h-screen bg-[#08080c] text-white overflow-x-hidden">

      {/* Subtle top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-pink-500/[0.04] blur-[150px] rounded-full pointer-events-none" />

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 w-full">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="OrganicSMM" className="w-10 h-10 rounded-xl object-cover" />
            <div className="leading-tight">
              <span className="text-lg font-extrabold tracking-tight">OrganicSMM</span>
              <span className="block text-[9px] font-semibold text-pink-400/70 tracking-[0.2em] uppercase">Updated Version</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden sm:inline-flex px-5 py-2.5 text-xs font-bold text-white/60 hover:text-white transition-colors">
              LOGIN
            </Link>
            <Link to="/auth" className="group relative px-6 py-2.5 rounded-full text-xs font-bold text-white overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 transition-all" />
              <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                GET STARTED <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 pt-16 sm:pt-24 pb-20 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.03] rounded-full px-5 py-2 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold text-white/50 tracking-wide">PLATFORM UPDATED • V3.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.03em] mb-8">
          <span className="block">Grow <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-fuchsia-400 bg-clip-text text-transparent">Organic.</span></span>
          <span className="block">Scale <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">Smarter.</span></span>
        </h1>

        <p className="max-w-lg mx-auto text-[15px] sm:text-base text-white/40 leading-relaxed mb-12 font-medium">
          The premium social media growth engine that delivers{' '}
          <span className="text-white/70 font-semibold">real organic engagement</span>{' '}
          with AI-powered delivery patterns indistinguishable from genuine activity.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/auth" className="group relative h-[52px] px-8 rounded-2xl text-sm font-bold text-white flex items-center gap-3 overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.15)]">
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600" />
            <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">Start Growing Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></span>
          </Link>
          <Link to="/auth" className="h-[52px] px-8 rounded-2xl text-sm font-semibold text-white/50 hover:text-white/80 border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04] flex items-center gap-2.5 transition-all duration-300">
            <Eye className="w-4 h-4" /> View Services
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                'bg-gradient-to-br from-pink-400 to-rose-500',
                'bg-gradient-to-br from-purple-400 to-fuchsia-500',
                'bg-gradient-to-br from-amber-400 to-orange-500',
                'bg-gradient-to-br from-emerald-400 to-teal-500',
              ].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-[#08080c] flex items-center justify-center text-[10px] font-bold text-white/90`}>
                  {['A', 'S', 'R', 'M'][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/30 font-medium">2,400+ Active Users</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-xs text-white/30 font-medium ml-1.5">4.9/5 Rating</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative z-10 border-y border-white/[0.05]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-3 divide-x divide-white/[0.05]">
          {[
            { value: '10M+', label: 'Engagement Delivered' },
            { value: '99.8%', label: 'Success Rate' },
            { value: '24/7', label: 'Auto Delivery' },
          ].map((s, i) => (
            <div key={i} className="py-8 sm:py-10 text-center">
              <p className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-1">{s.value}</p>
              <p className="text-[10px] sm:text-xs font-medium text-white/25 tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="relative z-10 py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white/20 mb-8">Works with every major platform</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
            {['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'].map((p) => (
              <span key={p} className="text-sm font-bold text-white/20 hover:text-white/40 transition-colors cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-pink-400/60 tracking-widest uppercase mb-3">Why OrganicSMM</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Built for <span className="text-pink-400">Performance</span>
            </h2>
            <p className="text-sm text-white/30 max-w-md mx-auto">Every feature engineered to deliver genuine, algorithm-safe growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.06]">
            {[
              { title: 'Organic Scheduler', desc: 'AI-driven variable speed delivery that mirrors real viral surge patterns across time zones.', icon: Clock, color: 'text-pink-400' },
              { title: 'Stealth Protocol', desc: 'Zero-footprint delivery with residential proxy rotation and encrypted communication trails.', icon: Shield, color: 'text-emerald-400' },
              { title: 'Multi-Provider', desc: 'Intelligent failover across multiple providers ensuring 99.9% uptime guarantee.', icon: Globe, color: 'text-blue-400' },
              { title: 'AI Autopilot', desc: 'Content-aware delivery that adapts speed based on real-time post engagement signals.', icon: Sparkles, color: 'text-amber-400' },
              { title: 'Anti-Detection', desc: 'Randomized variance, peak-hour boosting, and human behavior pattern simulation.', icon: Target, color: 'text-purple-400' },
              { title: 'Live Analytics', desc: 'Real-time dashboards tracking every order, delivery run, and provider response.', icon: BarChart3, color: 'text-cyan-400' },
            ].map((f, i) => (
              <div key={i} className="bg-[#0a0a0f] p-8 hover:bg-[#0e0e14] transition-colors duration-300 group">
                <f.icon className={`w-6 h-6 ${f.color} mb-5 opacity-70 group-hover:opacity-100 transition-opacity`} />
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/30 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-pink-400/60 tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Three Steps to Growth
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds. No subscription needed — add funds and go.', icon: Users },
              { step: '02', title: 'Choose Service', desc: 'Pick your platform, engagement type, quantity, and delivery speed.', icon: Rocket },
              { step: '03', title: 'Watch It Grow', desc: 'Our AI handles everything. Track real-time progress on your dashboard.', icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/[0.06] flex items-center justify-center">
                  <span className="text-lg font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-[700px] mx-auto">
          <div className="relative rounded-3xl border border-pink-500/10 bg-gradient-to-b from-pink-500/[0.04] to-transparent p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-pink-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
            <div className="relative">
              <img src={logo} alt="" className="w-14 h-14 rounded-xl object-cover mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Ready to <span className="text-pink-400">Dominate?</span>
              </h2>
              <p className="text-sm text-white/30 mb-8 max-w-sm mx-auto">
                Join thousands growing organically with our AI-powered platform. No subscriptions, no commitments.
              </p>
              <Link to="/auth" className="group inline-flex h-[52px] px-10 rounded-2xl text-sm font-bold text-white items-center gap-2.5 relative overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600" />
                <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">Create Free Account <ArrowRight className="w-4 h-4" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-sm font-bold text-white/30">OrganicSMM</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="text-xs text-white/20 hover:text-white/40 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacy</Link>
            <Link to="/refund" className="text-xs text-white/20 hover:text-white/40 transition-colors">Refund</Link>
          </div>
          <p className="text-[10px] text-white/15">© {new Date().getFullYear()} OrganicSMM</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
