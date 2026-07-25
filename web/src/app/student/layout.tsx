import { AuthGuard } from '@/components/auth/auth-guard';
import { FloatingShell } from '@/components/layout/floating-shell';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['STUDENT']}>
      <FloatingShell role="STUDENT">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </FloatingShell>
    </AuthGuard>
  );
}
