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
  PlayCircle,
} from 'lucide-react';
import logo from '@/assets/logo.jpg';
import './index-light.css';

const Index = () => {
  return (
    <main className="landing-shell overflow-x-hidden">
      {/* ─── NAV ─── */}
      <div className="relative z-50 px-3 py-3 sm:px-4 sm:py-5">
        <div className="landing-container landing-glass-nav rounded-[28px] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="OrganicSMM" className="h-11 w-11 rounded-2xl object-cover shadow-lg" />
              <div>
                <p className="text-lg font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>OrganicSMM</p>
                <p className="text-[9px] font-bold uppercase tracking-[.22em]" style={{ color: 'hsl(331 83% 62%)' }}>Updated Version</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/auth" className="hidden sm:block px-5 py-2.5 text-xs font-bold uppercase tracking-wider" style={{ color: 'hsl(228 13% 45%)' }}>
                Login
              </Link>
              <Link to="/auth" className="landing-primary-btn text-xs sm:text-sm font-bold uppercase tracking-wider">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="landing-container grid items-center gap-14 px-3 pb-20 pt-8 sm:px-4 md:grid-cols-[1fr_1fr] md:pt-14 lg:gap-8 lg:pb-28">
        <div className="text-center md:text-left">
          <div className="landing-badge mb-8 inline-flex">
            <span className="landing-badge-dot" />
            <span className="text-[11px] font-bold uppercase tracking-[.22em]" style={{ color: 'hsl(228 13% 45%)' }}>
              Platform Updated • V3.0
            </span>
          </div>

          <h1 className="landing-hero-title font-black">
            <span style={{ color: 'hsl(234 28% 16%)' }}>Grow </span>
            <span className="landing-word-accent">Organic.</span>
            <br />
            <span style={{ color: 'hsl(234 28% 16%)' }}>Scale </span>
            <span className="landing-word-accent">Smarter.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base font-medium leading-8 md:mx-0 md:text-lg" style={{ color: 'hsl(228 13% 45%)' }}>
            The premium social media growth engine that delivers{' '}
            <strong style={{ color: 'hsl(234 28% 16%)' }}>real organic engagement</strong>{' '}
            with AI-powered delivery patterns indistinguishable from genuine activity.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap md:items-start">
            <Link to="/auth" className="landing-primary-btn w-full sm:w-auto text-sm font-bold">
              Start Growing Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/auth" className="landing-secondary-btn w-full sm:w-auto text-sm font-semibold">
              <Eye className="w-4 h-4" /> View Services
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <div className="landing-proof-chip flex items-center gap-3 rounded-full px-4 py-2.5">
              <div className="flex -space-x-2">
                {[
                  { l: 'A', bg: 'hsl(331 83% 62%)' },
                  { l: 'S', bg: 'hsl(271 82% 63%)' },
                  { l: 'R', bg: 'hsl(46 96% 61%)' },
                  { l: 'M', bg: 'hsl(164 72% 57%)' },
                ].map((u) => (
                  <div key={u.l} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-black text-white" style={{ background: u.bg }}>
                    {u.l}
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>2,400+ Active Users</span>
            </div>
            <div className="landing-proof-chip flex items-center gap-2 rounded-full px-4 py-2.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="text-xs font-semibold ml-1" style={{ color: 'hsl(228 13% 45%)' }}>4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="landing-visual hidden md:block">
          <div className="landing-blob landing-blob--main" />
          <div className="landing-blob landing-blob--top" />
          <div className="landing-blob landing-blob--side" />

          <div className="landing-floating-card landing-floating-card--top">
            <span className="landing-icon-bubble" style={{ background: 'hsl(164 72% 57% / .16)', color: 'hsl(164 72% 32%)' }}>
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold" style={{ color: 'hsl(234 28% 16%)' }}>Safe Delivery</p>
              <p className="text-xs font-medium" style={{ color: 'hsl(228 13% 45%)' }}>Human-like pacing</p>
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card--mid">
            <span className="landing-icon-bubble" style={{ background: 'hsl(331 83% 62% / .14)', color: 'hsl(331 72% 48%)' }}>
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold" style={{ color: 'hsl(234 28% 16%)' }}>Fast Fulfillment</p>
              <p className="text-xs font-medium" style={{ color: 'hsl(228 13% 45%)' }}>Multi-provider</p>
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card--bottom">
            <span className="landing-icon-bubble" style={{ background: 'hsl(46 96% 61% / .16)', color: 'hsl(38 88% 38%)' }}>
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold" style={{ color: 'hsl(234 28% 16%)' }}>Live Results</p>
              <p className="text-xs font-medium" style={{ color: 'hsl(228 13% 45%)' }}>Track every order</p>
            </div>
          </div>

          <div className="landing-device">
            <div className="landing-device-screen">
              <div className="landing-screen-bar" />
              <div className="landing-screen-card landing-screen-card--hero mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.2em]" style={{ color: 'hsl(228 13% 45%)' }}>Growth Dashboard</p>
                  <p className="mt-1 text-xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>Updated Version</p>
                </div>
                <span className="rounded-full px-3 py-1.5 text-[10px] font-bold" style={{ background: 'hsl(164 72% 57% / .14)', color: 'hsl(164 72% 32%)' }}>Active</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="landing-screen-card rounded-xl p-3">
                  <p className="text-[10px] font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>Wallet</p>
                  <p className="mt-1 text-xl font-black" style={{ color: 'hsl(234 28% 16%)' }}>$500</p>
                  <p className="mt-1 text-[10px] font-medium" style={{ color: 'hsl(164 72% 32%)' }}>Ready</p>
                </div>
                <div className="landing-screen-card rounded-xl p-3">
                  <p className="text-[10px] font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>Orders</p>
                  <p className="mt-1 text-xl font-black" style={{ color: 'hsl(234 28% 16%)' }}>Live</p>
                  <p className="mt-1 text-[10px] font-medium" style={{ color: 'hsl(331 72% 48%)' }}>Tracking</p>
                </div>
              </div>
              <div className="landing-screen-card mt-3 rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold" style={{ color: 'hsl(234 28% 16%)' }}>Performance</p>
                  <PlayCircle className="w-4 h-4" style={{ color: 'hsl(331 72% 52%)' }} />
                </div>
                <div className="landing-mini-chart" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-6" style={{ borderTop: '1px solid hsl(26 28% 87% / .6)', borderBottom: '1px solid hsl(26 28% 87% / .6)', background: 'hsl(0 0% 100% / .5)' }}>
        <div className="landing-container grid grid-cols-1 gap-3 px-3 sm:grid-cols-3 sm:px-4">
          {[
            { v: '10M+', l: 'Engagement Delivered' },
            { v: '99.8%', l: 'Success Rate' },
            { v: '24/7', l: 'Auto Delivery' },
          ].map((s) => (
            <div key={s.l} className="landing-surface-card rounded-2xl px-6 py-7 text-center">
              <p className="text-4xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>{s.v}</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[.2em]" style={{ color: 'hsl(228 13% 45%)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PLATFORMS ─── */}
      <section className="py-14">
        <div className="landing-container px-3 sm:px-4">
          <p className="text-center text-[10px] font-black uppercase tracking-[.3em]" style={{ color: 'hsl(228 13% 45%)' }}>Works with every major platform</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'].map((p) => (
              <div key={p} className="landing-platform-chip rounded-full px-5 py-3 text-sm font-bold" style={{ color: 'hsl(234 28% 16%)' }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20">
        <div className="landing-container px-3 sm:px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-[.3em]" style={{ color: 'hsl(331 83% 62%)' }}>Why OrganicSMM</p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>
              Built for Performance
            </h2>
            <p className="mt-4 text-base font-medium" style={{ color: 'hsl(228 13% 45%)' }}>
              Every feature engineered to deliver genuine, algorithm-safe growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              { icon: Clock3, title: 'Organic Scheduler', desc: 'AI-driven variable speed delivery that mirrors real viral surge patterns across time zones.', bg: 'hsl(164 72% 57% / .12)', fg: 'hsl(164 72% 36%)' },
              { icon: Shield, title: 'Stealth Protocol', desc: 'Zero-footprint delivery with residential proxy rotation and encrypted trails.', bg: 'hsl(271 82% 63% / .1)', fg: 'hsl(271 64% 48%)' },
              { icon: Globe, title: 'Multi-Provider', desc: 'Intelligent failover across multiple providers for 99.9% uptime guarantee.', bg: 'hsl(331 83% 62% / .1)', fg: 'hsl(331 72% 50%)' },
              { icon: Sparkles, title: 'AI Autopilot', desc: 'Content-aware delivery that adapts speed based on post engagement signals.', bg: 'hsl(46 96% 61% / .14)', fg: 'hsl(38 88% 40%)' },
              { icon: Zap, title: 'Anti-Detection', desc: 'Randomized variance, peak-hour boosting, and human behavior simulation.', bg: 'hsl(197 82% 60% / .12)', fg: 'hsl(197 76% 40%)' },
              { icon: BarChart3, title: 'Live Analytics', desc: 'Real-time dashboards tracking every order, run, and provider response.', bg: 'hsl(148 66% 52% / .1)', fg: 'hsl(148 62% 34%)' },
            ].map((f) => (
              <div key={f.title} className="landing-feature-card rounded-[2rem] p-7">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: f.bg, color: f.fg }}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>{f.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7" style={{ color: 'hsl(228 13% 45%)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section className="py-20">
        <div className="landing-container px-3 sm:px-4">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.3em]" style={{ color: 'hsl(164 72% 38%)' }}>Simple Process</p>
              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>
                Three Steps to Growth
              </h2>
              <p className="mt-4 text-base font-medium leading-8" style={{ color: 'hsl(228 13% 45%)' }}>
                Signup, add funds, place the order, and track everything — no subscription wall, no cluttered flow.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { n: '01', title: 'Create Account', desc: 'Quick signup, straight access to the platform.' },
                { n: '02', title: 'Add Funds & Order', desc: 'Top up wallet, select service, enter quantity, place order.' },
                { n: '03', title: 'Track Growth', desc: 'Follow order progress and delivery in real-time.' },
              ].map((s) => (
                <div key={s.n} className="landing-step-card rounded-[1.8rem] p-6 sm:p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-base font-black text-white" style={{ background: 'linear-gradient(135deg, hsl(331 83% 62%), hsl(271 82% 63%))', boxShadow: '0 14px 28px hsl(331 83% 62% / .2)' }}>
                      {s.n}
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>{s.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7" style={{ color: 'hsl(228 13% 45%)' }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pb-20 pt-6">
        <div className="landing-container px-3 sm:px-4">
          <div className="landing-cta-panel rounded-[2.4rem] px-6 py-12 text-center sm:px-12 sm:py-16">
            <img src={logo} alt="" className="mx-auto h-16 w-16 rounded-xl object-cover shadow-lg" />
            <p className="mt-6 text-xs font-black uppercase tracking-[.3em]" style={{ color: 'hsl(331 83% 62%)' }}>Premium Platform</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'hsl(234 28% 16%)' }}>
              Ready to Grow Your Social Presence?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-8" style={{ color: 'hsl(228 13% 45%)' }}>
              Join thousands of creators and businesses growing organically. No subscriptions, no commitments.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth" className="landing-primary-btn w-full sm:w-auto text-sm font-bold">
                Create Free Account <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/auth" className="landing-secondary-btn w-full sm:w-auto text-sm font-semibold">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid hsl(26 28% 87% / .7)', background: 'hsl(0 0% 100% / .5)' }} className="py-8">
        <div className="landing-container flex flex-col sm:flex-row items-center justify-between gap-4 px-3 sm:px-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 rounded-2xl object-cover" />
            <div>
              <p className="text-sm font-black" style={{ color: 'hsl(234 28% 16%)' }}>OrganicSMM</p>
              <p className="text-xs font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>Updated Version</p>
            </div>
          </div>
          <div className="flex gap-5 text-sm font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>
            <Link to="/terms" className="hover:opacity-70 transition-opacity">Terms</Link>
            <Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy</Link>
            <Link to="/refund" className="hover:opacity-70 transition-opacity">Refund</Link>
          </div>
          <p className="text-xs font-semibold" style={{ color: 'hsl(228 13% 45%)' }}>© {new Date().getFullYear()} OrganicSMM</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
