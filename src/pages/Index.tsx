import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Shield, BarChart3, CheckCircle2, Shuffle, Clock, Moon, Timer, Eye, ChevronRight, FileText, Lock, HelpCircle, Mail, Code2, Activity, X, Check } from 'lucide-react';
import logo from '@/assets/logo.jpg';
import { PageMeta } from '@/components/seo/PageMeta';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fff 0%, #fdf2f8 30%, #fce7f3 50%, #fdf2f8 70%, #f9fafb 100%)', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageMeta
        title="OrganicSMM — Organic Social Media Growth Platform"
        description="Revolutionary organic social media growth with natural delivery patterns. 100% safe for your accounts."
      />

      {/* ═══ NAV ═══ */}
      <nav className="sticky top-0 z-50" style={{ background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="OrganicSMM" className="w-9 h-9 rounded-xl object-cover" />
            <span className="text-[16px] font-bold tracking-tight" style={{ color: '#1a1a2e' }}>OrganicSMM</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[13.5px] font-medium" style={{ color: '#666' }}>Features</a>
            <a href="#how-it-works" className="text-[13.5px] font-medium" style={{ color: '#666' }}>How It Works</a>
            <a href="#comparison" className="text-[13.5px] font-medium" style={{ color: '#666' }}>Why Us</a>
          </div>
          <Link to="/auth" className="h-10 px-6 rounded-full text-[13px] font-bold text-white flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', boxShadow: '0 4px 14px rgba(236,72,153,.3)' }}>
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="pt-16 sm:pt-24 pb-10 text-center px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Updated Version Badge - stylish */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,.1), rgba(219,39,119,.06))', border: '1px solid rgba(236,72,153,.18)', boxShadow: '0 2px 12px rgba(236,72,153,.08)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ec4899' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#ec4899' }}></span>
            </span>
            <span className="text-[11.5px] font-bold uppercase tracking-widest" style={{ color: '#db2777' }}>v2.0 Updated</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(236,72,153,.12)', color: '#be185d' }}>NEW</span>
          </div>

          {/* AI Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10" style={{ background: 'rgba(236,72,153,.08)', border: '1px solid rgba(236,72,153,.15)' }}>
            <Zap className="w-4 h-4" style={{ color: '#ec4899' }} />
            <span className="text-[13px] font-semibold" style={{ color: '#be185d' }}>World's First AI-Organic Panel</span>
          </div>

          <h1 className="text-[clamp(2.4rem,6vw,4.2rem)] font-black leading-[1.08] tracking-[-0.03em] mb-6" style={{ color: '#1a1a2e', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>
            Organic Growth{' '}
            <br className="hidden sm:block" />
            Made <span style={{ color: '#ec4899' }}>Simple</span>
          </h1>

          <p className="text-[16px] sm:text-[17px] leading-[1.7] mb-10 max-w-lg mx-auto" style={{ color: '#888' }}>
            Revolutionary organic social media growth with natural delivery patterns. 100% <strong style={{ color: '#555' }}>safe</strong> for your accounts.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link to="/auth" className="h-13 px-8 py-3.5 rounded-full text-[15px] font-bold text-white flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', boxShadow: '0 8px 28px rgba(236,72,153,.35)' }}>
              <Zap className="w-4 h-4" /> Start Growing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/auth" className="h-13 px-8 py-3.5 rounded-full text-[15px] font-semibold flex items-center gap-2" style={{ color: '#444', border: '1px solid rgba(0,0,0,.12)', background: 'white' }}>
              View Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 flex-wrap text-[12.5px] font-medium" style={{ color: '#999' }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#10b981' }} /> No credit card required</span>
            <span style={{ color: '#ddd' }}>·</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#10b981' }} /> All features included</span>
            <span style={{ color: '#ddd' }}>·</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#10b981' }} /> Instant setup</span>
          </div>
        </div>
      </section>

      {/* ═══ UNIQUE FEATURES (small cards row) ═══ */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(236,72,153,.08)', border: '1px solid rgba(236,72,153,.12)' }}>
              <Zap className="w-3.5 h-3.5" style={{ color: '#ec4899' }} />
              <span className="text-[11.5px] font-bold uppercase tracking-widest" style={{ color: '#db2777' }}>World's First AI-Organic Panel</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: '#1a1a2e', fontFamily: "'Outfit', system-ui" }}>
              Features <span style={{ color: '#ec4899' }}>No Other Panel Has</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: TrendingUp, title: 'S-Curve Pattern', desc: 'Natural viral growth simulation', border: '#ec4899' },
              { icon: Shuffle, title: '±50% Variance', desc: 'Random qty each delivery', border: '#f59e0b' },
              { icon: Clock, title: 'Peak Hour Boost', desc: '1.5x during 6-10PM IST', border: '#3b82f6' },
              { icon: Moon, title: 'Night Slowdown', desc: 'Realistic sleep patterns', border: '#10b981' },
              { icon: Timer, title: '±5min Jitter', desc: 'Anti-detection timing', border: '#8b5cf6' },
              { icon: Eye, title: 'Live Preview', desc: 'See delivery before order', border: '#06b6d4' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-5 text-center transition-all hover:-translate-y-1" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', borderTop: `3px solid ${f.border}`, boxShadow: '0 4px 20px rgba(0,0,0,.03)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: '#f5f5f5' }}>
                  <f.icon className="w-5 h-5" style={{ color: '#333' }} />
                </div>
                <h3 className="text-[13px] font-bold mb-1" style={{ color: '#1a1a2e' }}>{f.title}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: '#999' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section id="comparison" className="py-12 px-6">
        <div className="max-w-[900px] mx-auto rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', borderTop: '3px solid', borderImage: 'linear-gradient(90deg, #ec4899, #f59e0b, #10b981, #3b82f6) 1', boxShadow: '0 4px 24px rgba(0,0,0,.04)' }}>
          <div className="grid md:grid-cols-2 divide-x divide-gray-100">
            {/* Regular panels */}
            <div className="p-8">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#f5f5f5' }}>
                  <X className="w-4 h-4" style={{ color: '#999' }} />
                </div>
                <span className="text-[15px] font-bold" style={{ color: '#1a1a2e' }}>Regular SMM Panels</span>
              </div>
              <div className="space-y-3">
                {[
                  'Same quantity every batch = Easy detection',
                  'Fixed intervals = Bot pattern visible',
                  '24/7 delivery = Unnatural behavior',
                  'Accounts get flagged & banned',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#ef4444' }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* OrganicSMM */}
            <div className="p-8" style={{ background: '#fefce8' }}>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#dcfce7' }}>
                  <Check className="w-4 h-4" style={{ color: '#16a34a' }} />
                </div>
                <span className="text-[15px] font-bold" style={{ color: '#1a1a2e' }}>OrganicSMM (This Panel)</span>
              </div>
              <div className="space-y-3">
                {[
                  'Random variance = Looks like real users',
                  'Jittered timing = Undetectable patterns',
                  'Peak hours + night slow = Human behavior',
                  '100% safe, zero bans reported',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#16a34a' }} />
                    <span className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 flex-wrap py-5 px-6" style={{ borderTop: '1px solid rgba(0,0,0,.06)', background: '#fafafa' }}>
            {[
              { icon: '🏆', text: '50,000+ Orders Delivered' },
              { icon: '🛡️', text: 'Zero Account Bans' },
              { icon: '⚡', text: '99.9% Success Rate' },
            ].map((s) => (
              <span key={s.text} className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: '#555' }}>
                <span>{s.icon}</span> {s.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES GRID (larger cards) ═══ */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#999' }}>Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: '#1a1a2e', fontFamily: "'Outfit', system-ui" }}>
              Built for <span style={{ color: '#ec4899' }}>Real Growth</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: TrendingUp, title: 'Natural Growth Curves', desc: 'Variable delivery quantities that perfectly mimic real organic engagement patterns.', border: '#ec4899' },
              { icon: Zap, title: 'Peak Hour Optimization', desc: 'Higher delivery during active hours (6PM-10PM) for realistic engagement timing.', border: '#f59e0b' },
              { icon: Shield, title: 'Account Safety', desc: 'Randomized patterns prevent detection and keep your accounts 100% secure.', border: '#10b981' },
              { icon: BarChart3, title: 'Live Preview', desc: 'See exactly when and how much will be delivered before placing your order.', border: '#3b82f6' },
              { icon: CheckCircle2, title: 'Premium Quality', desc: 'High-quality engagement from real-looking accounts with complete profiles.', border: '#8b5cf6' },
              { icon: Shuffle, title: 'Organic Variance', desc: '±25% random variance on each delivery for unpredictable, natural growth.', border: '#06b6d4' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-7 transition-all hover:-translate-y-1" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', borderTop: `3px solid ${f.border}`, boxShadow: '0 4px 20px rgba(0,0,0,.03)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: '#f5f5f5' }}>
                  <f.icon className="w-5 h-5" style={{ color: '#333' }} />
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: '#1a1a2e' }}>{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-[900px] mx-auto rounded-3xl text-center py-16 px-8" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)', borderTop: '3px solid', borderImage: 'linear-gradient(90deg, #ec4899, #f59e0b, #10b981) 1', boxShadow: '0 8px 32px rgba(0,0,0,.04)' }}>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: '#1a1a2e', fontFamily: "'Outfit', system-ui" }}>
            Ready to Grow <span style={{ color: '#ec4899' }}>Organically</span>?
          </h2>
          <p className="text-[15px] mb-8 max-w-md mx-auto" style={{ color: '#888' }}>
            Join thousands of creators and businesses using our organic delivery system. No credit card required to start.
          </p>
          <Link to="/auth" className="inline-flex h-13 px-8 py-3.5 rounded-full text-[15px] font-bold text-white items-center gap-2" style={{ background: 'linear-gradient(135deg, #ec4899, #db2777)', boxShadow: '0 8px 28px rgba(236,72,153,.35)' }}>
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6" style={{ background: '#f9fafb', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logo} alt="" className="w-9 h-9 rounded-xl object-cover" />
                <span className="text-[15px] font-bold" style={{ color: '#1a1a2e' }}>OrganicSMM</span>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: '#999' }}>
                Revolutionary organic social media growth platform with natural delivery patterns.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: '#1a1a2e' }}>Quick Links</h4>
              <div className="space-y-2.5">
                <Link to="/auth" className="block text-[13px] hover:underline" style={{ color: '#ec4899' }}>Get Started</Link>
                <Link to="/services" className="block text-[13px] hover:underline" style={{ color: '#ec4899' }}>Services</Link>
              </div>
            </div>
            {/* Legal */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: '#1a1a2e' }}>Legal</h4>
              <div className="space-y-2.5">
                {[
                  { to: '/terms', icon: FileText, label: 'Terms of Service' },
                  { to: '/privacy', icon: Lock, label: 'Privacy Policy' },
                  { to: '/refund', icon: FileText, label: 'Refund Policy' },
                  { to: '/cookies', icon: FileText, label: 'Cookie Policy' },
                ].map((l) => (
                  <Link key={l.to} to={l.to} className="flex items-center gap-1.5 text-[13px] hover:underline" style={{ color: '#888' }}>
                    <l.icon className="w-3 h-3" /> {l.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Support */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: '#1a1a2e' }}>Support</h4>
              <div className="space-y-2.5">
                {[
                  { icon: HelpCircle, label: 'Help Center' },
                  { icon: Mail, label: 'Contact Us' },
                  { icon: Code2, label: 'API Documentation' },
                  { icon: Activity, label: 'Status Page' },
                ].map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5 text-[13px]" style={{ color: '#888' }}>
                    <l.icon className="w-3 h-3" /> {l.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
            <p className="text-[12px]" style={{ color: '#bbb' }}>© {new Date().getFullYear()} OrganicSMM. All rights reserved.</p>
            <div className="flex items-center gap-5 text-[12px] font-medium" style={{ color: '#999' }}>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" style={{ color: '#10b981' }} /> SSL Secured</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" style={{ color: '#f59e0b' }} /> 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
