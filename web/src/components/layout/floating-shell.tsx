'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, Building2, BookOpen, 
  CalendarDays, Settings, LogOut, Search, UploadCloud,
  Command
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { NotificationBell } from '@/components/notifications/notification-bell';

export function FloatingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);
  const role = user?.role || 'ADMIN';

  const getNav = () => {
    if (role === 'ADMIN' || role === 'HOD') return [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard },
      { name: 'Scheduling', href: '/admin/scheduling', icon: CalendarDays },
      { name: 'Import Wizard', href: '/admin/import', icon: UploadCloud },
      ...(role === 'ADMIN' ? [{ name: 'Users', href: '/admin/users', icon: Users }] : []),
    ];
    if (role === 'FACULTY') return [
      { name: 'My Schedule', href: '/lecturer', icon: CalendarDays },
    ];
    if (role === 'STUDENT') return [
      { name: 'Academic Hub', href: '/student', icon: LayoutDashboard },
    ];
    return [];
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar - Premium Linear Style */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-[260px] h-full bg-[#0e0e11] border-r border-white/5 flex flex-col hidden md:flex shrink-0 relative z-20"
      >
        <div className="h-14 flex items-center px-4 mb-4 border-b border-white/5">
          <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center mr-3">
            <span className="text-white text-[10px] font-bold">SC</span>
          </div>
          <span className="font-semibold text-sm tracking-wide">Smart Campus</span>
        </div>
        
        <div className="px-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 border border-white/5 rounded-md text-xs text-zinc-400">
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <div className="ml-auto flex gap-0.5">
              <kbd className="bg-white/10 px-1 rounded text-[10px]">⌘</kbd>
              <kbd className="bg-white/10 px-1 rounded text-[10px]">K</kbd>
            </div>
          </div>
        </div>

        <div className="px-3 pb-2 text-xs font-medium text-zinc-500">Menu</div>
        
        <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
          {getNav().map(item => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} className="block outline-none">
                <div className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${isActive ? 'bg-white/10 text-white font-medium' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}>
                  <item.icon className="h-4 w-4 mr-3 opacity-70" strokeWidth={isActive ? 2 : 1.5} />
                  {item.name}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/5 bg-[#0e0e11]">
          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer mb-2">
            <div className="h-8 w-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold">
              {user?.userId?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">{user?.userId || 'Administrator'}</p>
              <p className="text-xs text-zinc-500 truncate">{role}</p>
            </div>
          </div>
          <button 
            onClick={() => { logout(); window.location.href = '/login'; }}
            className="w-full flex items-center px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3 opacity-70" /> 
            Log out
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b] relative z-10">
        
        {/* Top Header */}
        <header className="h-14 shrink-0 border-b border-white/5 flex items-center justify-between px-6 bg-[#09090b]">
          <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
            <Command className="h-4 w-4" />
            <span>Workspace</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">{getNav().find(n => pathname === n.href || pathname.startsWith(`${n.href}/`))?.name || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </header>

        {/* Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
