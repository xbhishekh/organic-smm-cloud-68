import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  ListOrdered,
  Settings,
  LifeBuoy,
  Shield,
  LogOut,
  Rocket,
  Sparkles,
  X,
  ChevronDown,
  Code2
} from 'lucide-react';
import logo from '@/assets/logo.jpg';
import { useAuth } from '@/hooks/useAuth';
import { useCurrency, CURRENCIES, type CurrencyCode } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  onClose?: () => void;
}

const userNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Rocket, label: 'Full Engagement', path: '/engagement-order', highlight: true },
  { icon: Sparkles, label: 'Engagement Orders', path: '/engagement-orders' },
  { icon: ShoppingCart, label: 'Single Order', path: '/order' },
  { icon: ListOrdered, label: 'Single Orders', path: '/orders' },
  { icon: Package, label: 'Services', path: '/services' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: Code2, label: 'API Access', path: '/api-access' },
  { icon: LifeBuoy, label: 'Support', path: '/support' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminNavItems = [
  { icon: Shield, label: 'Admin Panel', path: '/admin' },
];

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const { isAdmin, signOut, wallet, profile } = useAuth();
  const { currency, setCurrency, formatPrice, currencyInfo } = useCurrency();
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#08080c]/95 backdrop-blur-xl border-r border-white/[0.06] shadow-[20px_0_40px_rgba(0,0,0,0.3)]">
      <div className="flex h-full flex-col overflow-hidden">
        {/* Logo Section */}
        <div className="flex h-[80px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="OrganicSMM" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-pink-500/20" />
            <div>
              <h1 className="font-[900] text-[15px] tracking-tight text-white leading-none">OrganicSMM</h1>
              <p className="text-[8px] font-[800] uppercase tracking-[0.2em] text-pink-400/50 mt-1">Pro Console</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden h-8 w-8 text-white/40"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile Mini */}
        {profile && (
          <div className="mx-4 mb-3 flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-[900] shrink-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/10 text-pink-400 shadow-sm">
              {profile.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-[800] truncate text-white/90">
                {profile.full_name || 'User'}
              </p>
              <p className="text-[10px] font-medium truncate text-white/25">{profile.email}</p>
            </div>
          </div>
        )}

        {/* Balance Card */}
        <div className="mx-4 relative">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#12101a] to-[#0a0810] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] relative overflow-hidden border border-white/[0.06]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/15 blur-[40px] rounded-full -mr-12 -mt-12" />

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-pink-500/10 border border-pink-500/10">
                <Wallet className="h-3.5 w-3.5 text-pink-400" />
              </div>
              <p className="text-[9px] font-[800] tracking-[0.2em] uppercase text-white/25">Wallet</p>
            </div>

            <p className="text-2xl font-[900] tracking-tighter leading-none text-white mb-4">
              {formatPrice(wallet?.balance || 0)}
            </p>

            <Link
              to="/wallet"
              onClick={handleNavClick}
              className="w-full h-10 btn-3d flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest rounded-xl"
            >
              <Wallet className="h-3 w-3" />
              ADD FUNDS
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-3 pt-5 pb-3 overflow-y-auto scrollbar-thin">
          <p className="px-4 mb-3 text-[9px] font-[800] uppercase tracking-[0.2em] text-white/15">
            Menu
          </p>
          {userNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isHighlight = (item as any).highlight;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={cn(
                  'group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-[12px] font-[700] mb-0.5',
                  isActive
                    ? 'bg-pink-500/10 text-white border border-pink-500/15'
                    : 'text-white/35 hover:text-white/70 hover:bg-white/[0.03]'
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-lg",
                  isActive ? "bg-pink-500/15" : "bg-transparent"
                )}>
                  <item.icon className={cn("h-[14px] w-[14px]", isActive ? "text-pink-400" : "text-inherit")} />
                </div>
                <span className="flex-1">{item.label}</span>
                {isHighlight && !isActive && (
                  <span className="text-[7px] px-2 py-0.5 rounded-full font-[800] uppercase tracking-widest bg-pink-500/10 text-pink-400 border border-pink-500/15">
                    Pro
                  </span>
                )}
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                )}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="my-3 mx-3 border-t border-white/[0.04]" />
              <p className="px-3 mb-2 text-[9px] font-[800] uppercase tracking-[0.2em] text-white/15">
                Admin
              </p>
              {adminNavItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={cn(
                      'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-[800] uppercase tracking-widest',
                      isActive
                        ? 'bg-pink-500/15 text-white border border-pink-500/20'
                        : 'text-white/25 hover:text-white/60 hover:bg-white/[0.03]'
                    )}
                  >
                    <div className={cn(
                      'flex items-center justify-center w-7 h-7 rounded-lg',
                      isActive ? 'bg-pink-500/15' : 'bg-white/[0.03]'
                    )}>
                      <item.icon className={cn('h-[14px] w-[14px]', isActive ? 'text-pink-400' : 'text-pink-400/50')} />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        {/* Currency Switcher */}
        <div className="px-3 pb-2 relative">
          <button
            onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-[12px] font-[700] text-white/30 hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{currencyInfo.flag}</span>
              <span className="uppercase tracking-widest">{currencyInfo.code}</span>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5", showCurrencyPicker && "rotate-180")} />
          </button>

          {showCurrencyPicker && (
            <div className="absolute bottom-full left-3 right-3 mb-1 rounded-xl overflow-hidden z-50 bg-[#0c0c14] border border-white/[0.06] shadow-2xl backdrop-blur-xl">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setShowCurrencyPicker(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-[600] transition-all',
                    currency === c.code
                      ? 'bg-pink-500/10 text-pink-400'
                      : 'text-white/30 hover:bg-white/[0.03]'
                  )}
                >
                  <span className="text-base">{c.flag}</span>
                  <span className="flex-1 text-left">{c.code}</span>
                  <span className="text-[10px] opacity-30">{c.symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out */}
        <div className="p-3 border-t border-white/[0.04]">
          <button
            onClick={() => signOut()}
            className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-[700] text-white/25 hover:bg-white/[0.03]"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/10">
              <LogOut className="h-3.5 w-3.5 text-rose-400/60" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
