'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  userId: z.string().min(3, 'User ID must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({ onLoginSuccess }: { onLoginSuccess?: (user: any) => void }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

      if (onLoginSuccess) {
        onLoginSuccess(user);
      } else {
        if (user.role === 'ADMIN') router.push('/admin');
        else if (user.role === 'HOD') router.push('/admin');
        else if (user.role === 'FACULTY') router.push('/lecturer');
        else if (user.role === 'STUDENT') router.push('/student');
        else router.push('/dashboard');
      }
      
    } catch (err: any) {
      let errorMessage = 'Invalid credentials. Please try again.';
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data.message === 'string') {
          errorMessage = data.message;
        } else if (Array.isArray(data.message)) {
          errorMessage = data.message.join(', ');
        } else if (typeof data === 'string') {
          errorMessage = data;
        }
      } else if (typeof err.message === 'string') {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[22px] p-8 relative overflow-hidden">
      {/* Soft inner glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="space-y-2">
          <label htmlFor="userId" className="text-sm font-medium text-zinc-300">
            User ID
          </label>
          <div className="relative">
            <input 
              id="userId" 
              placeholder="Enter your user ID" 
              {...register('userId')} 
              className={`w-full h-12 px-4 bg-black/20 border ${errors.userId ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500/50'} rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all`}
              disabled={isSubmitting}
            />
          </div>
          <AnimatePresence>
            {errors.userId && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-400 mt-1.5"
              >
                {errors.userId.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-zinc-300">
              Password
            </label>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input 
              id="password" 
              type={showPassword ? "text" : "password"}
              placeholder="••••••••" 
              {...register('password')} 
              className={`w-full h-12 pl-4 pr-12 bg-black/20 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500/50'} rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all`}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors rounded-lg focus:outline-none focus:bg-white/5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-400 mt-1.5"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit" 
            className="w-full h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </motion.div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
