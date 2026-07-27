import { AuthGuard } from '@/components/auth/auth-guard';
import { FloatingShell } from '@/components/layout/floating-shell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['ADMIN', 'HOD']}>
      <FloatingShell>
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </FloatingShell>
    </AuthGuard>
  );
}
