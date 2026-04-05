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
  PlayCircle,
  Zap,
} from 'lucide-react';
import logo from '@/assets/logo.jpg';
import './index-light.css';

const heroStats = [
  { value: '10M+', label: 'Engagement Delivered' },
  { value: '99.8%', label: 'Success Rate' },
  { value: '24/7', label: 'Auto Delivery' },
];

const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter/X', 'Facebook', 'Telegram'];

const features = [
  {
    icon: Clock3,
    title: 'Organic Scheduler',
    description: 'Smart pacing keeps delivery natural with smooth spread, variance control, and realistic timing.',
    iconBg: 'bg-[hsl(164_72%_57%_/_.14)] text-[hsl(164_72%_38%)]',
  },
  {
    icon: Shield,
    title: 'Safe Delivery Logic',
    description: 'Patterns are tuned to feel human, reduce spikes, and keep account activity looking clean.',
    iconBg: 'bg-[hsl(271_82%_63%_/_.12)] text-[hsl(271_64%_48%)]',
  },
  {
    icon: Globe,
    title: 'Multi Provider Routing',
    description: 'Orders can flow through multiple provider accounts for stronger stability and better fulfillment.',
    iconBg: 'bg-[hsl(331_83%_62%_/_.12)] text-[hsl(331_72%_52%)]',
  },
  {
    icon: Sparkles,
    title: 'AI Delivery Intelligence',
    description: 'Delivery speed adapts to the order pattern so the overall flow feels premium and believable.',
    iconBg: 'bg-[hsl(46_96%_61%_/_.16)] text-[hsl(38_88%_42%)]',
  },
  {
    icon: BarChart3,
    title: 'Live Tracking',
    description: 'Users can watch progress, history, and performance in one simple dashboard without confusion.',
    iconBg: 'bg-[hsl(197_82%_60%_/_.14)] text-[hsl(197_76%_42%)]',
  },
  {
    icon: Wallet,
    title: 'Wallet Based Ordering',
    description: 'No subscription friction — users just add funds, place orders, and keep the flow simple.',
    iconBg: 'bg-[hsl(148_66%_52%_/_.12)] text-[hsl(148_62%_36%)]',
  },
];

const steps = [
  {
    step: '01',
    title: 'Create account',
    description: 'Quick signup, no subscription barrier, straight access to the platform.',
  },
  {
    step: '02',
    title: 'Add funds & choose service',
    description: 'Top up wallet, select a service, enter quantity, and place your order in a few clicks.',
  },
  {
    step: '03',
    title: 'Track growth in real time',
    description: 'Follow order progress, delivery status, and history inside the dashboard.',
  },
];

const proofItems = [
  { label: '2,400+ Active Users' },
  { label: '4.9/5 Rating' },
];

const Index = () => {
  return (
    <main className="landing-shell overflow-x-hidden">
      <div className="relative z-10 px-3 py-3 sm:px-4 sm:py-5">
        <div className="landing-container landing-glass-nav rounded-[28px] px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <img src={logo} alt="OrganicSMM logo" className="h-11 w-11 rounded-2xl object-cover shadow-[0_14px_24px_hsl(331_83%_62%_/_0.16)]" />
              <div className="min-w-0">
                <p className="truncate text-lg font-black tracking-tight text-foreground">OrganicSMM</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(331_83%_62%)]">Updated Version</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[hsl(228_13%_45%)] transition-colors hover:text-foreground"
              >
                Login
              </Link>
              <Link to="/auth" className="landing-primary-btn text-xs uppercase tracking-[0.14em] sm:text-sm">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="landing-container grid items-center gap-14 px-3 pb-20 pt-8 sm:px-4 md:grid-cols-[1.02fr_0.98fr] md:pt-10 lg:gap-10 lg:pb-24">
        <div className="text-center md:text-left">
          <div className="landing-badge mb-8">
            <span className="landing-badge-dot" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[hsl(228_13%_45%)]">
              Platform Updated • V3.0
            </span>
          </div>

          <h1 className="landing-hero-title font-display font-black">
            <span className="landing-word-soft">Grow</span>{' '}
            <span className="landing-word-accent">Organic.</span>
            <br />
            <span className="landing-word-soft">Scale</span>{' '}
            <span className="landing-word-accent">Smarter.</span>
          </h1>

          <p className="landing-copy mx-auto mt-7 max-w-xl text-base font-medium leading-8 md:mx-0 md:text-lg">
            OrganicSMM is a premium growth platform for users who want a clean wallet-based ordering experience,
            smarter delivery flow, and a website that feels modern, bright, and high trust.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap md:items-start">
            <Link to="/auth" className="landing-primary-btn w-full sm:w-auto">
              Start Growing Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="landing-secondary-btn w-full sm:w-auto">
              <Eye className="h-4 w-4" />
              View Services
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <div className="landing-proof-chip flex items-center gap-3 rounded-full px-4 py-3">
              <div className="flex -space-x-2">
                {['A', 'S', 'M', 'P'].map((letter, index) => (
                  <div
                    key={letter}
                    className={[
                      'flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-black text-white',
                      index === 0 && 'bg-[hsl(331_83%_62%)]',
                      index === 1 && 'bg-[hsl(271_82%_63%)]',
                      index === 2 && 'bg-[hsl(46_96%_61%)] text-[hsl(234_28%_16%)]',
                      index === 3 && 'bg-[hsl(164_72%_57%)] text-[hsl(234_28%_16%)]',
                    ].filter(Boolean).join(' ')}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold text-[hsl(228_13%_45%)]">{proofItems[0].label}</span>
            </div>

            <div className="landing-proof-chip flex items-center gap-3 rounded-full px-4 py-3">
              <div className="flex items-center gap-1 text-[hsl(46_96%_52%)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[hsl(228_13%_45%)]">{proofItems[1].label}</span>
            </div>
          </div>
        </div>

        <div className="landing-visual">
          <div className="landing-blob landing-blob--main" />
          <div className="landing-blob landing-blob--top" />
          <div className="landing-blob landing-blob--side" />

          <div className="landing-floating-card landing-floating-card--top">
            <span className="landing-icon-bubble bg-[hsl(164_72%_57%_/_0.18)] text-[hsl(164_72%_32%)]">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Safe Delivery</p>
              <p className="text-xs font-medium text-[hsl(228_13%_45%)]">Human-like pacing enabled</p>
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card--mid">
            <span className="landing-icon-bubble bg-[hsl(331_83%_62%_/_0.16)] text-[hsl(331_72%_48%)]">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Fast Fulfillment</p>
              <p className="text-xs font-medium text-[hsl(228_13%_45%)]">Multi-provider routing</p>
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card--bottom">
            <span className="landing-icon-bubble bg-[hsl(46_96%_61%_/_0.18)] text-[hsl(38_88%_38%)]">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Live Results</p>
              <p className="text-xs font-medium text-[hsl(228_13%_45%)]">Track every order easily</p>
            </div>
          </div>

          <div className="landing-device">
            <div className="landing-device-screen">
              <div className="landing-screen-bar" />

              <div className="landing-screen-card landing-screen-card--hero mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(228_13%_45%)]">Growth Dashboard</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">Updated Version</h2>
                </div>
                <span className="rounded-full bg-[hsl(164_72%_57%_/_0.16)] px-3 py-2 text-xs font-bold text-[hsl(164_72%_32%)]">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="landing-screen-card rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold text-[hsl(228_13%_45%)]">Wallet balance</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-foreground">$500</p>
                  <p className="mt-2 text-xs font-medium text-[hsl(164_72%_32%)]">Ready for ordering</p>
                </div>
                <div className="landing-screen-card rounded-[1.25rem] p-4">
                  <p className="text-xs font-semibold text-[hsl(228_13%_45%)]">Order status</p>
                  <p className="mt-2 text-2xl font-black tracking-tight text-foreground">Live</p>
                  <p className="mt-2 text-xs font-medium text-[hsl(331_72%_48%)]">Tracking enabled</p>
                </div>
              </div>

              <div className="landing-screen-card mt-4 rounded-[1.35rem] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">Performance</p>
                    <p className="text-xs font-medium text-[hsl(228_13%_45%)]">Natural organic curve</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-[hsl(331_72%_52%)]" />
                </div>
                <div className="landing-mini-chart" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[hsl(26_28%_87%)]/80 bg-white/50 py-5 backdrop-blur-sm">
        <div className="landing-container grid grid-cols-1 gap-3 px-3 sm:grid-cols-3 sm:px-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="landing-surface-card rounded-[1.7rem] px-6 py-6 text-center">
              <p className="text-4xl font-black tracking-[-0.05em] text-foreground">{stat.value}</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[hsl(228_13%_45%)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="landing-container px-3 sm:px-4">
          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-[hsl(228_13%_45%)]">Works with every major platform</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {platforms.map((platform) => (
              <div key={platform} className="landing-platform-chip rounded-full px-5 py-3 text-sm font-bold text-[hsl(234_28%_16%)]">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="landing-container px-3 sm:px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[hsl(331_83%_62%)]">Why OrganicSMM</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-foreground sm:text-5xl">
              Bright, clean and built to convert
            </h2>
            <p className="mt-4 text-base font-medium leading-8 text-[hsl(228_13%_45%)]">
              The platform already has the core system — this landing page now explains it in a lighter, more premium,
              trust-building way.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="landing-feature-card rounded-[2rem] p-7">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] ${feature.iconBg}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-foreground">{feature.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-[hsl(228_13%_45%)]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-20">
        <div className="landing-container px-3 sm:px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[hsl(164_72%_38%)]">Simple process</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-foreground sm:text-5xl">
                Wallet based ordering without confusion
              </h2>
              <p className="mt-4 text-base font-medium leading-8 text-[hsl(228_13%_45%)]">
                Signup, add funds, place the order, and track everything — no subscription wall, no cluttered flow.
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step) => (
                <div key={step.step} className="landing-step-card rounded-[1.8rem] p-6 sm:p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[hsl(331_83%_62%)] to-[hsl(271_82%_63%)] text-base font-black text-white shadow-[0_18px_28px_hsl(331_83%_62%_/_0.2)]">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-foreground">{step.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[hsl(228_13%_45%)]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6 sm:pb-24">
        <div className="landing-container px-3 sm:px-4">
          <div className="landing-cta-panel rounded-[2.4rem] px-6 py-12 text-center sm:px-12 sm:py-16">
            <img src={logo} alt="OrganicSMM logo" className="mx-auto h-16 w-16 rounded-[1.4rem] object-cover shadow-[0_20px_34px_hsl(331_83%_62%_/_0.16)]" />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-[hsl(331_83%_62%)]">Premium updated version</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-[-0.05em] text-foreground sm:text-5xl">
              A light premium UI that feels polished, modern and human-made
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-8 text-[hsl(228_13%_45%)]">
              OrganicSMM is now positioned like a real polished product — bright visuals, softer depth, strong CTAs,
              and a cleaner first impression.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth" className="landing-primary-btn w-full sm:w-auto">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="landing-secondary-btn w-full sm:w-auto">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[hsl(26_28%_87%)]/90 bg-white/50 py-8 backdrop-blur-sm">
        <div className="landing-container flex flex-col items-center justify-between gap-4 px-3 text-center sm:flex-row sm:px-4 sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="OrganicSMM logo" className="h-10 w-10 rounded-2xl object-cover" />
            <div>
              <p className="text-sm font-black text-foreground">OrganicSMM</p>
              <p className="text-xs font-semibold text-[hsl(228_13%_45%)]">Updated Version</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-[hsl(228_13%_45%)]">
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link to="/refund" className="transition-colors hover:text-foreground">Refund</Link>
          </div>

          <p className="text-xs font-semibold text-[hsl(228_13%_45%)]">© {new Date().getFullYear()} OrganicSMM</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
