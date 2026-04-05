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
  ChevronRight,
} from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Index = () => {
  return (
    <main className="min-h-screen bg-[#060608] text-white flex flex-col items-center font-sans overflow-x-hidden selection:bg-pink-500/30">

      {/* ── AMBIENT GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-30%] left-[-15%] w-[70vw] h-[70vw] bg-pink-500/[0.07] blur-[180px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[60vw] h-[60vw] bg-purple-600/[0.05] blur-[160px] rounded-full" />
        <div className="absolute top-[50%] left-[50%] w-[40vw] h-[40vw] bg-amber-500/[0.03] blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* ── NAVBAR ── */}
      <nav className="w-full max-w-6xl flex items-center justify-between px-6 py-5 mx-auto relative z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="OrganicSMM" className="w-11 h-11 rounded-2xl object-cover shadow-lg shadow-pink-500/20" />
          <div>
            <span className="text-xl font-[900] tracking-tight text-white">OrganicSMM</span>
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-pink-400/60">Updated Version</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <button className="px-6 py-2.5 rounded-full text-[11px] font-[800] text-white/70 uppercase tracking-[0.15em] border border-white/10 hover:border-pink-500/30 hover:text-white transition-all bg-white/[0.03] backdrop-blur-sm">
              Login
            </button>
          </Link>
          <Link to="/auth">
            <button className="px-7 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-full text-[11px] font-[900] text-white uppercase tracking-[0.12em] shadow-[0_8px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_12px_40px_rgba(236,72,153,0.4)] flex items-center gap-2 transition-all">
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="w-full max-w-6xl px-6 pt-24 pb-20 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2.5 bg-pink-500/[0.08] border border-pink-500/20 px-5 py-2 rounded-full mb-10 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
          <span className="text-[10px] font-[800] uppercase tracking-[0.2em] text-pink-400">Platform Updated • v3.0</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-[1000] leading-[0.92] tracking-[-0.04em] mb-8">
          <span className="text-white">Grow </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400">Organic.</span><br />
          <span className="text-white">Scale </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">Smarter.</span>
        </h1>

        <p className="text-base md:text-lg text-white/40 font-medium mb-12 max-w-xl leading-relaxed">
          The premium social media growth engine that delivers <span className="text-pink-400 font-semibold">real organic engagement</span> with AI-powered delivery patterns indistinguishable from genuine activity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link to="/auth">
            <button className="h-14 px-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-2xl font-[800] text-sm tracking-tight shadow-[0_15px_40px_rgba(236,72,153,0.25)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.35)] flex items-center justify-center gap-3 transition-all">
              Start Growing Now <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/auth">
            <button className="h-14 px-10 bg-white/[0.04] border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.06] text-white/70 hover:text-white rounded-2xl font-[700] text-sm tracking-tight flex items-center justify-center gap-3 transition-all backdrop-blur-sm">
              <Eye className="w-4 h-4" /> View Services
            </button>
          </Link>
        </div>

        {/* ── SOCIAL PROOF ── */}
        <div className="flex items-center gap-8 mb-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/40 to-purple-500/40 border-2 border-[#060608] flex items-center justify-center">
                  <Users className="w-3 h-3 text-white/60" />
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-white/30">2,400+ Active Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-xs font-bold text-white/30 ml-1">4.9/5 Rating</span>
          </div>
        </div>

        {/* ── HERO STATS GRID ── */}
        <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
          {[
            { value: '10M+', label: 'Engagement Delivered', icon: TrendingUp },
            { value: '99.8%', label: 'Success Rate', icon: CheckCircle2 },
            { value: '24/7', label: 'Auto Delivery', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="relative group">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 text-center hover:border-pink-500/20 hover:bg-white/[0.04] transition-all">
                <stat.icon className="w-5 h-5 text-pink-400/60 mx-auto mb-3" />
                <p className="text-2xl sm:text-3xl font-[900] tracking-tighter text-white mb-1">{stat.value}</p>
                <p className="text-[10px] font-[700] uppercase tracking-[0.15em] text-white/25">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="w-full py-16 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[10px] font-[800] uppercase tracking-[0.3em] text-white/15 mb-8">Supported Platforms</p>
          <div className="flex items-center justify-center gap-10 flex-wrap opacity-30">
            {['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'].map((p) => (
              <span key={p} className="text-sm font-[800] tracking-tight text-white/60">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="w-full py-20 relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-[800] uppercase tracking-[0.3em] text-pink-400/60 mb-4">Why OrganicSMM</p>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tight text-white mb-4">Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Performance</span></h2>
            <p className="text-sm text-white/30 font-medium max-w-md mx-auto">Every feature engineered to deliver genuine, algorithm-safe growth.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Organic Scheduler', desc: 'AI-driven variable speed delivery that mirrors real viral surge patterns.', icon: Clock, gradient: 'from-pink-500/20 to-rose-500/10' },
              { title: 'Stealth Protocol', desc: 'Zero-footprint delivery with residential proxy rotation and encrypted trails.', icon: Shield, gradient: 'from-emerald-500/20 to-teal-500/10' },
              { title: 'Multi-Provider', desc: 'Intelligent failover across multiple providers for 99.9% uptime.', icon: Globe, gradient: 'from-blue-500/20 to-indigo-500/10' },
              { title: 'AI Autopilot', desc: 'Content-aware delivery that adapts speed based on post engagement signals.', icon: Sparkles, gradient: 'from-amber-500/20 to-orange-500/10' },
              { title: 'Anti-Detection', desc: 'Randomized variance, peak-hour boosting, and human behavior simulation.', icon: Target, gradient: 'from-purple-500/20 to-violet-500/10' },
              { title: 'Live Analytics', desc: 'Real-time dashboards tracking every order, run, and provider response.', icon: BarChart3, gradient: 'from-cyan-500/20 to-sky-500/10' },
            ].map((f, i) => (
              <div key={i} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-pink-500/15 hover:bg-white/[0.04] transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 border border-white/[0.06] group-hover:scale-105 transition-transform`}>
                  <f.icon className="w-5 h-5 text-white/70" />
                </div>
                <h3 className="text-lg font-[800] text-white mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-white/30 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="w-full py-20 relative z-10 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] font-[800] uppercase tracking-[0.3em] text-pink-400/60 mb-4">Simple Process</p>
            <h2 className="text-3xl md:text-5xl font-[900] tracking-tight text-white">Three Steps to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Growth</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Sign up in seconds. No subscription required — just add funds and start.', icon: Users },
              { step: '02', title: 'Choose Service', desc: 'Select your platform, engagement type, and delivery speed preferences.', icon: Rocket },
              { step: '03', title: 'Watch Growth', desc: 'Our AI handles everything. Track real-time delivery on your dashboard.', icon: TrendingUp },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/[0.06] flex items-center justify-center mx-auto mb-5 group-hover:border-pink-500/20 transition-all">
                  <span className="text-xl font-[900] bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">{s.step}</span>
                </div>
                <h3 className="text-lg font-[800] text-white mb-2 tracking-tight">{s.title}</h3>
                <p className="text-sm text-white/30 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="w-full py-24 relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-[2.5rem] border border-pink-500/15 bg-gradient-to-br from-pink-500/[0.06] to-purple-600/[0.04] p-12 sm:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <img src={logo} alt="OrganicSMM" className="w-16 h-16 rounded-2xl object-cover mx-auto mb-6 shadow-lg shadow-pink-500/20" />
              <h2 className="text-3xl md:text-5xl font-[900] tracking-tight text-white mb-4">
                Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Dominate?</span>
              </h2>
              <p className="text-sm text-white/35 font-medium mb-8 max-w-md mx-auto">
                Join thousands of creators and businesses growing organically with our AI-powered platform.
              </p>
              <Link to="/auth">
                <button className="h-14 px-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-2xl font-[800] text-sm tracking-tight shadow-[0_15px_40px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3 mx-auto transition-all">
                  Create Free Account <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full py-12 relative z-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="OrganicSMM" className="w-9 h-9 rounded-xl object-cover" />
              <span className="text-sm font-[800] text-white/40">OrganicSMM</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-xs font-medium text-white/20 hover:text-white/40 transition-colors">Terms</Link>
              <Link to="/privacy" className="text-xs font-medium text-white/20 hover:text-white/40 transition-colors">Privacy</Link>
              <Link to="/refund" className="text-xs font-medium text-white/20 hover:text-white/40 transition-colors">Refund Policy</Link>
            </div>
            <p className="text-[10px] text-white/15 font-medium">© {new Date().getFullYear()} OrganicSMM. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
};

export default Index;
