import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Star, Shield, Sparkles, BarChart3, Globe, Clock3, Zap } from 'lucide-react';
import logo from '@/assets/logo.jpg';
import heroVisual from '@/assets/hero-visual.jpg';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ════ HERO FULL BLEED ════ */}
      <section className="relative min-h-[100vh] flex flex-col">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroVisual} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,.88) 0%, rgba(157,23,77,.75) 40%, rgba(234,88,12,.6) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.4) 100%)' }} />
        </div>

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5 max-w-[1300px] mx-auto w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="OrganicSMM" className="w-10 h-10 rounded-xl object-cover shadow-lg" />
            <span className="text-[17px] font-extrabold text-white tracking-tight">OrganicSMM</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden sm:block text-[13px] font-semibold text-white/70 hover:text-white transition-colors px-4 py-2">
              Log in
            </Link>
            <Link to="/auth" className="text-[13px] font-bold text-white px-5 py-2.5 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.2)' }}>
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-[1300px] mx-auto w-full px-6 sm:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-white text-[clamp(2.6rem,6vw,5rem)] font-black leading-[1] tracking-[-0.03em] mb-6" style={{ fontFamily: "'Outfit', system-ui, sans-serif", textShadow: '0 4px 30px rgba(0,0,0,.3)' }}>
                Social Media Growth, Done Right.
              </h1>
              <p className="text-white/70 text-[16px] sm:text-[18px] leading-[1.7] mb-8 max-w-md">
                Real organic engagement with natural delivery patterns. No bots, no spam — just clean, algorithm-safe growth for your brand.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/auth" className="h-12 px-7 rounded-xl text-[14px] font-bold text-purple-900 bg-white flex items-center gap-2 shadow-xl hover:shadow-2xl transition-shadow">
                  Start Growing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/auth" className="h-12 px-7 rounded-xl text-[14px] font-semibold text-white flex items-center gap-2" style={{ border: '1px solid rgba(255,255,255,.25)', background: 'rgba(255,255,255,.08)', backdropFilter: 'blur(8px)' }}>
                  <Eye className="w-4 h-4" /> View Services
                </Link>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {['#ec4899','#8b5cf6','#f59e0b','#10b981'].map((c, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white/20 text-[9px] font-bold text-white flex items-center justify-center" style={{ background: c }}>
                        {['A','S','R','M'][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-[12px] text-white/50 font-medium">2,400+ users</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  <span className="text-[12px] text-white/50 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="relative z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full block" preserveAspectRatio="none" style={{ height: '60px' }}>
            <path d="M0 80V30C240 0 480 0 720 15C960 30 1200 60 1440 50V80H0Z" fill="#fafaf8" />
          </svg>
        </div>
      </section>

      {/* ════ REST OF PAGE — LIGHT ════ */}
      <div style={{ background: '#fafaf8', color: '#1a1a2e' }}>

        {/* Stats */}
        <section className="py-6">
          <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-3 gap-4">
            {[
              { n: '10M+', l: 'Engagement delivered' },
              { n: '99.8%', l: 'Success rate' },
              { n: '24/7', l: 'Auto delivery' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl py-8 text-center" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', boxShadow: '0 4px 20px rgba(0,0,0,.03)' }}>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#1a1a2e' }}>{s.n}</p>
                <p className="text-[10px] font-semibold mt-1.5 uppercase tracking-wider" style={{ color: '#aaa' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section className="py-14">
          <div className="max-w-[1100px] mx-auto px-6">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[.3em] mb-6" style={{ color: '#bbb' }}>Supported platforms</p>
            <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
              {['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'].map((p) => (
                <span key={p} className="text-[13px] font-semibold" style={{ color: '#999' }}>{p}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9333ea' }}>Features</p>
              <h2 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Everything you need to grow
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: Clock3, title: 'Organic scheduling', desc: 'Variable speed delivery that mirrors how real engagement happens.', accent: '#ec4899' },
                { icon: Shield, title: 'Account safety', desc: 'Patterns tuned to look natural. No spikes, no red flags.', accent: '#10b981' },
                { icon: Globe, title: 'Multi-provider', desc: 'Orders route through multiple providers for better stability.', accent: '#3b82f6' },
                { icon: Sparkles, title: 'Smart delivery', desc: 'Speed adapts based on order size and platform patterns.', accent: '#f59e0b' },
                { icon: Zap, title: 'Instant start', desc: 'Orders begin processing within minutes of placement.', accent: '#8b5cf6' },
                { icon: BarChart3, title: 'Live tracking', desc: 'Watch progress and delivery status update in real time.', accent: '#06b6d4' },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl p-7 transition-all hover:-translate-y-1" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', boxShadow: '0 4px 20px rgba(0,0,0,.03)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: f.accent + '14', color: f.accent }}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-bold mb-2">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#10b981' }}>How it works</p>
              <h2 className="text-3xl sm:text-[2.6rem] font-extrabold tracking-tight" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                Three steps. That's it.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: '1', title: 'Create account', desc: 'Sign up with email. Takes about 30 seconds.', color: '#ec4899' },
                { n: '2', title: 'Add funds & order', desc: 'Top up wallet, pick a service, enter link and quantity.', color: '#8b5cf6' },
                { n: '3', title: 'Track results', desc: 'Watch your order progress live from the dashboard.', color: '#f59e0b' },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl p-7 text-center" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', boxShadow: '0 4px 20px rgba(0,0,0,.03)' }}>
                  <div className="w-12 h-12 rounded-xl text-base font-black text-white flex items-center justify-center mx-auto mb-5" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`, boxShadow: `0 8px 24px ${s.color}33` }}>
                    {s.n}
                  </div>
                  <h3 className="text-[17px] font-bold mb-2">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden text-center" style={{ minHeight: '400px' }}>
              <img src={heroVisual} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(88,28,135,.92) 0%, rgba(157,23,77,.85) 50%, rgba(234,88,12,.75) 100%)' }} />
              <div className="relative z-10 py-16 px-6">
                <img src={logo} alt="" className="w-14 h-14 rounded-xl object-cover mx-auto mb-6 shadow-xl" />
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3" style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}>
                  Ready to start?
                </h2>
                <p className="text-[15px] text-white/60 mb-8 max-w-md mx-auto">
                  No subscriptions, no commitments. Sign up, add funds, and grow your social presence today.
                </p>
                <Link to="/auth" className="inline-flex h-12 px-8 rounded-xl text-[14px] font-bold items-center gap-2 bg-white shadow-xl hover:shadow-2xl transition-shadow" style={{ color: '#581c87' }}>
                  Create free account <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="w-7 h-7 rounded-md object-cover" />
              <span className="text-[13px] font-semibold" style={{ color: '#1a1a2e' }}>OrganicSMM</span>
            </div>
            <div className="flex gap-5 text-[12px] font-medium" style={{ color: '#999' }}>
              <Link to="/terms" className="hover:text-[#666] transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-[#666] transition-colors">Privacy</Link>
              <Link to="/refund" className="hover:text-[#666] transition-colors">Refund</Link>
            </div>
            <p className="text-[11px]" style={{ color: '#ccc' }}>© {new Date().getFullYear()} OrganicSMM</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
