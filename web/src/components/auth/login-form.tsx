'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  userId: z.string().min(3, 'User ID must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', data);
      const { access_token, user } = response.data;
      
      setAuth(user, access_token);

      // Role-based routing
      if (user.role === 'ADMIN') router.push('/admin');
      else if (user.role === 'HOD') router.push('/hod');
      else if (user.role === 'FACULTY') router.push('/lecturer');
      else if (user.role === 'STUDENT') router.push('/student');
      else router.push('/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pt-6 space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input 
              id="userId" 
              placeholder="Enter your user ID" 
              {...register('userId')} 
              className={errors.userId ? 'border-destructive' : ''}
              disabled={isSubmitting}
            />
            {errors.userId && (
              <p className="text-xs text-destructive">{errors.userId.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password"
              placeholder="••••••••" 
              {...register('password')} 
              className={errors.password ? 'border-destructive' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pb-6">
          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
