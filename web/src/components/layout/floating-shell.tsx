'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, Building2, BookOpen, 
  CalendarDays, Settings, LogOut, Bell, Search 
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FloatingShell({ children, role }: { children: React.ReactNode, role: string }) {
  const pathname = usePathname();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);

  const getNav = () => {
    if (role === 'ADMIN') return [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard },
      { name: 'Scheduling', href: '/admin/scheduling', icon: CalendarDays },
      { name: 'Users', href: '/admin/users', icon: Users },
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
    <div className="flex h-screen w-full bg-background p-4 gap-4 overflow-hidden selection:bg-primary/20">
      {/* Floating Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-64 h-full bg-card/80 backdrop-blur-2xl rounded-3xl shadow-soft border border-border/50 flex flex-col hidden md:flex overflow-hidden"
      >
        <div className="h-24 flex items-center px-8 font-extrabold text-2xl tracking-tight">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3 shadow-sm">
            <span className="text-white text-xl leading-none">✦</span>
          </div>
          Campus
        </div>
        
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
          {getNav().map(item => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} className="relative block group">
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center px-4 py-3.5 rounded-2xl transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-foreground group-hover:bg-muted/50'}`}>
                  <item.icon className="h-5 w-5 mr-3" strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4">
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 mb-2 hover:bg-muted/50 transition-colors cursor-pointer">
            <p className="text-sm font-semibold truncate text-foreground">{user?.userId || 'Administrator'}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">{role}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-11" onClick={() => { logout(); window.location.href = '/login'; }}>
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Floating Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h-16 shrink-0 bg-card/70 backdrop-blur-xl rounded-full shadow-soft border border-border/50 mb-4 px-6 flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-2 max-w-md w-full bg-muted/40 rounded-full px-4 py-1.5 focus-within:bg-muted/60 focus-within:ring-2 ring-primary/20 transition-all">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search everywhere..." className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-2 h-7 text-sm" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-muted/30 hover:bg-muted/60 transition-colors text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-accent to-primary shadow-sm border-2 border-background cursor-pointer hover:scale-105 transition-transform" />
          </div>
        </motion.header>

        {/* Scrollable Canvas */}
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 overflow-y-auto pb-4 px-2"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
