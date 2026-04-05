import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Star,
  Shield,
  Sparkles,
  BarChart3,
  Globe,
  Clock3,
  TrendingUp,
  Users,
  Wallet,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Index = () => {
  return (
    <main className="min-h-screen bg-[#0b0b10] text-white overflow-x-hidden relative">
      {/* Smooth ambient glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-pink-500/[0.08] blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-fuchsia-600/[0.05] blur-[180px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/[0.04] blur-[160px]" />
      </div>

      {/* ─── NAV ─── */}
      <nav className="relative z-50 mx-auto max-w-6xl px-5 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="OrganicSMM" className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
          <div>
            <p className="text-base font-extrabold tracking-tight">OrganicSMM</p>
            <p className="text-[9px] font-bold uppercase tracking-[.22em] text-pink-400">Updated Version</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden sm:block px-5 py-2.5 text-xs font-bold text-white/50 hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/auth" className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-fuchsia-600 shadow-[0_8px_32px_rgba(236,72,153,.3)] hover:shadow-[0_12px_40px_rgba(236,72,153,.4)] transition-shadow">
            Get Started <ArrowRight className="inline w-3.5 h-3.5 ml-1 -mt-px" />
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pt-20 sm:pt-28 pb-24 text-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[.08] bg-white/[.03] px-5 py-2 mb-10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-[11px] font-semibold text-white/50 tracking-wider">PLATFORM UPDATED • V3.0</span>
        </div>

        <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[.9] tracking-[-.04em] mb-7" style={{ textShadow: '0 0 80px rgba(236,72,153,.15)' }}>
          <span className="text-white">Grow </span>
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent">Organic.</span>
          <br />
          <span className="text-white">Scale </span>
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">Smarter.</span>
        </h1>

        <p className="mx-auto max-w-lg text-base sm:text-lg text-white/40 leading-relaxed mb-10">
          The premium social media growth engine that delivers <span className="text-pink-300 font-medium">real organic engagement</span> with delivery patterns indistinguishable from genuine activity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="/auth" className="h-[52px] px-8 rounded-2xl text-sm font-bold bg-gradient-to-r from-pink-500 to-fuchsia-600 flex items-center gap-2 shadow-[0_16px_48px_rgba(236,72,153,.25)] hover:shadow-[0_20px_56px_rgba(236,72,153,.35)] transition-shadow">
            Start Growing Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/auth" className="h-[52px] px-8 rounded-2xl text-sm font-semibold text-white/60 hover:text-white border border-white/[.08] hover:border-white/[.15] bg-white/[.03] hover:bg-white/[.06] flex items-center gap-2 backdrop-blur-sm transition-all">
            <Eye className="w-4 h-4" /> View Services
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-3 bg-white/[.04] border border-white/[.06] rounded-full px-4 py-2.5 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {['bg-pink-500','bg-purple-500','bg-amber-500','bg-emerald-500'].map((bg, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-[#0b0b10] flex items-center justify-center text-[10px] font-bold`}>
                  {['A','S','R','M'][i]}
                </div>
              ))}
            </div>
            <span className="text-xs text-white/40 font-medium">2,400+ Active Users</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[.04] border border-white/[.06] rounded-full px-4 py-2.5 backdrop-blur-sm">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
            <span className="text-xs text-white/40 font-medium ml-1.5">4.9/5 Rating</span>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-20">
        <div className="grid grid-cols-3 gap-4">
          {[
            { v: '10M+', l: 'Engagement Delivered' },
            { v: '99.8%', l: 'Success Rate' },
            { v: '24/7', l: 'Auto Delivery' },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-white/[.06] bg-white/[.03] backdrop-blur-sm py-8 text-center hover:border-pink-500/20 hover:bg-white/[.05] transition-all">
              <p className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{s.v}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[.18em] text-white/30 mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="relative z-10 border-y border-white/[.05] py-12">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-center text-[10px] font-bold uppercase tracking-[.3em] text-white/20 mb-6">Works with every major platform</p>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'].map((p) => (
              <span key={p} className="text-sm font-bold text-white/25 hover:text-white/50 transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="relative z-10 py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-pink-400/70 mb-3">Why OrganicSMM</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Built for <span className="text-pink-400">Performance</span>
            </h2>
            <p className="text-sm text-white/30 mt-3 max-w-md mx-auto">Every feature engineered to deliver genuine, algorithm-safe growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Clock3, title: 'Organic Scheduler', desc: 'AI-driven variable speed delivery that mirrors real viral surge patterns.', color: 'text-pink-400 bg-pink-500/10' },
              { icon: Shield, title: 'Stealth Protocol', desc: 'Zero-footprint delivery with residential proxy rotation and encrypted trails.', color: 'text-emerald-400 bg-emerald-500/10' },
              { icon: Globe, title: 'Multi-Provider', desc: 'Intelligent failover across multiple providers for 99.9% uptime.', color: 'text-blue-400 bg-blue-500/10' },
              { icon: Sparkles, title: 'AI Autopilot', desc: 'Content-aware delivery that adapts speed based on engagement signals.', color: 'text-amber-400 bg-amber-500/10' },
              { icon: Zap, title: 'Anti-Detection', desc: 'Randomized variance, peak-hour boosting, and human behavior simulation.', color: 'text-purple-400 bg-purple-500/10' },
              { icon: BarChart3, title: 'Live Analytics', desc: 'Real-time dashboards tracking every order, run, and provider response.', color: 'text-cyan-400 bg-cyan-500/10' },
            ].map((f) => (
              <div key={f.title} className="group rounded-2xl border border-white/[.06] bg-white/[.02] backdrop-blur-sm p-7 hover:border-pink-500/15 hover:bg-white/[.04] transition-all">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-white/30 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="relative z-10 py-20 px-5">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-pink-400/70 mb-3">Simple Process</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">Three Steps to Growth</h2>
          </div>

          <div className="space-y-4">
            {[
              { n: '01', title: 'Create Account', desc: 'Sign up in seconds. No subscription needed — add funds and go.' },
              { n: '02', title: 'Choose Service', desc: 'Pick your platform, engagement type, quantity, and delivery speed.' },
              { n: '03', title: 'Watch It Grow', desc: 'Our AI handles everything. Track real-time progress on your dashboard.' },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-5 rounded-2xl border border-white/[.06] bg-white/[.02] backdrop-blur-sm p-6 hover:border-pink-500/15 hover:bg-white/[.04] transition-all">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-sm font-black shadow-[0_8px_24px_rgba(236,72,153,.2)]">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative z-10 py-20 px-5">
        <div className="mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-pink-500/10 bg-gradient-to-b from-pink-500/[.05] via-fuchsia-500/[.03] to-transparent p-10 sm:p-16 text-center overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-pink-500/[.08] blur-[140px] rounded-full pointer-events-none" />
            <div className="relative">
              <img src={logo} alt="" className="w-14 h-14 rounded-xl object-cover mx-auto mb-6 ring-1 ring-white/10" />
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Ready to <span className="text-pink-400">Dominate?</span>
              </h2>
              <p className="text-sm text-white/30 mb-8 max-w-sm mx-auto">
                Join thousands growing organically. No subscriptions, no commitments — just results.
              </p>
              <Link to="/auth" className="inline-flex h-[52px] px-10 rounded-2xl text-sm font-bold bg-gradient-to-r from-pink-500 to-fuchsia-600 items-center gap-2 shadow-[0_16px_48px_rgba(236,72,153,.25)] hover:shadow-[0_20px_56px_rgba(236,72,153,.35)] transition-shadow">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/[.05] py-8">
        <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="w-7 h-7 rounded-lg object-cover" />
            <span className="text-sm font-bold text-white/30">OrganicSMM</span>
          </div>
          <div className="flex gap-5 text-xs text-white/20">
            <Link to="/terms" className="hover:text-white/40 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white/40 transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-white/40 transition-colors">Refund</Link>
          </div>
          <p className="text-[10px] text-white/15">© {new Date().getFullYear()} OrganicSMM</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
