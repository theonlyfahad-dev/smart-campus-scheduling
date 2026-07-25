'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BookOpen, 
  CalendarDays, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  role: 'ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';
}

const adminNav = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Scheduling Engine', href: '/admin/scheduling', icon: CalendarDays },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Departments', href: '/admin/departments', icon: Building2 },
  { name: 'Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  let navItems = adminNav; // Simplified for now

  return (
    <aside className="w-64 border-r bg-background flex flex-col hidden md:flex">
      <div className="h-16 border-b flex items-center px-6 font-bold text-lg tracking-tight">
        <span className="text-primary mr-2">✦</span> Smart Campus
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start h-10 px-3 ${isActive ? 'font-medium bg-secondary text-secondary-foreground' : 'text-muted-foreground'}`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t space-y-4">
        <div className="px-3">
          <p className="text-sm font-medium leading-none">{user?.userId || 'User'}</p>
          <p className="text-xs text-muted-foreground mt-1">{role}</p>
        </div>
        <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => {
          logout();
          window.location.href = '/login';
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
