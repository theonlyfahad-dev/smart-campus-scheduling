import { LoginForm } from '@/components/auth/login-form';
import { Layers } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your university account to continue</p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
