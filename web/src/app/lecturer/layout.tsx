import { AuthGuard } from '@/components/auth/auth-guard';
import { FloatingShell } from '@/components/layout/floating-shell';

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['FACULTY', 'HOD']}>
      <FloatingShell role="FACULTY">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </FloatingShell>
    </AuthGuard>
  );
}
