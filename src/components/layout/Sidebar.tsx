import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Wallet, ListOrdered, Settings, LifeBuoy, Shield, LogOut, Rocket, Sparkles, X, ChevronDown, Code2 } from 'lucide-react';
import logo from '@/assets/logo.jpg';
import { useAuth } from '@/hooks/useAuth';
import { useCurrency, CURRENCIES } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarProps { onClose?: () => void; }

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

const adminNavItems = [{ icon: Shield, label: 'Admin Panel', path: '/admin' }];

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const { isAdmin, signOut, wallet, profile } = useAuth();
  const { currency, setCurrency, formatPrice, currencyInfo } = useCurrency();
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  return (
    <div className="h-full w-full overflow-hidden flex flex-col" style={{ background: '#fafaf8', borderRight: '1px solid rgba(0,0,0,.06)' }}>
      {/* Logo */}
      <div className="flex items-center justify-between h-[68px] px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="OrganicSMM" className="w-9 h-9 rounded-lg object-cover" />
          <div>
            <p className="text-[14px] font-bold tracking-tight" style={{ color: '#1a1a2e' }}>OrganicSMM</p>
            <p className="text-[8px] font-semibold uppercase tracking-[.2em]" style={{ color: '#9333ea' }}>Pro Console</p>
          </div>
        </Link>
        <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg" style={{ color: '#999' }}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* User */}
      {profile && (
        <div className="mx-4 mb-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ background: 'white', border: '1px solid rgba(0,0,0,.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}>
            {profile.full_name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold truncate" style={{ color: '#1a1a2e' }}>{profile.full_name || 'User'}</p>
            <p className="text-[10px] truncate" style={{ color: '#999' }}>{profile.email}</p>
          </div>
        </div>
      )}

      {/* Balance */}
      <div className="mx-4 mb-4">
        <div className="rounded-xl p-4 relative overflow-hidden" style={{ background: '#1a1a2e' }}>
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-white/40">Wallet</span>
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight mb-3">{formatPrice(wallet?.balance || 0)}</p>
          <Link to="/wallet" onClick={onClose} className="flex items-center justify-center gap-1.5 w-full h-8 rounded-lg text-[11px] font-semibold" style={{ background: 'rgba(255,255,255,.12)', color: 'white' }}>
            <Wallet className="w-3 h-3" /> Add Funds
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#bbb' }}>Menu</p>
        {userNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={onClose}
              className={cn('flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium mb-0.5 transition-colors',
                isActive ? 'font-semibold' : ''
              )}
              style={{
                background: isActive ? 'white' : 'transparent',
                color: isActive ? '#1a1a2e' : '#888',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,.04)' : 'none',
                border: isActive ? '1px solid rgba(0,0,0,.06)' : '1px solid transparent',
              }}
            >
              <item.icon className="w-4 h-4" style={{ color: isActive ? '#9333ea' : '#bbb' }} />
              <span className="flex-1">{item.label}</span>
              {(item as any).highlight && !isActive && (
                <span className="text-[8px] px-1.5 py-0.5 rounded font-semibold" style={{ background: '#f3e8ff', color: '#9333ea' }}>Pro</span>
              )}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <div className="my-3 mx-3" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }} />
            <p className="px-3 mb-2 text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#bbb' }}>Admin</p>
            {adminNavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link key={item.path} to={item.path} onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium mb-0.5"
                  style={{
                    background: isActive ? 'white' : 'transparent',
                    color: isActive ? '#1a1a2e' : '#888',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,.04)' : 'none',
                    border: isActive ? '1px solid rgba(0,0,0,.06)' : '1px solid transparent',
                  }}
                >
                  <item.icon className="w-4 h-4" style={{ color: isActive ? '#ef4444' : '#bbb' }} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Currency */}
      <div className="px-3 pb-2 relative">
        <button onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[12px] font-medium" style={{ color: '#888' }}>
          <div className="flex items-center gap-2">
            <span className="text-base">{currencyInfo.flag}</span>
            <span className="uppercase tracking-wider">{currencyInfo.code}</span>
          </div>
          <ChevronDown className={cn("w-3.5 h-3.5", showCurrencyPicker && "rotate-180")} />
        </button>
        {showCurrencyPicker && (
          <div className="absolute bottom-full left-3 right-3 mb-1 rounded-lg overflow-hidden z-50 shadow-lg" style={{ background: 'white', border: '1px solid rgba(0,0,0,.08)' }}>
            {CURRENCIES.map((c) => (
              <button key={c.code} onClick={() => { setCurrency(c.code); setShowCurrencyPicker(false); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[12px] font-medium"
                style={{ background: currency === c.code ? '#f9f5ff' : 'white', color: currency === c.code ? '#9333ea' : '#666' }}>
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-left">{c.code}</span>
                <span className="text-[10px] opacity-40">{c.symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sign out */}
      <div className="p-3" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <button onClick={() => signOut()} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium" style={{ color: '#999' }}>
          <LogOut className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
