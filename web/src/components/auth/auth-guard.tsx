'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!token || !user) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // Forbidden, redirect to their default dashboard
      if (user.role === 'ADMIN') router.replace('/admin');
      else if (user.role === 'HOD') router.replace('/hod');
      else if (user.role === 'FACULTY') router.replace('/lecturer');
      else if (user.role === 'STUDENT') router.replace('/student');
      else router.replace('/unauthorized');
      return;
    }

    setIsChecking(false);
  }, [user, token, router, pathname, allowedRoles]);

  if (isChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
