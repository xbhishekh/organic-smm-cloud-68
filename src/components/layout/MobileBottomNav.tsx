import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import logo from '@/assets/logo.jpg';

export function MobileBottomNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 lg:hidden">
        <div className="flex items-center justify-between h-14 px-4 bg-[#060608]/90 backdrop-blur-xl border-b border-white/[0.06]">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5 text-white/60" />
          </button>

          <div className="flex items-center gap-2.5">
            <img src={logo} alt="OrganicSMM" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-[900] text-base tracking-tight text-white">OrganicSMM</span>
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
