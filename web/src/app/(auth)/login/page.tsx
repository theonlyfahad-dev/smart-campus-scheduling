'use client';
import { LoginForm } from '@/components/auth/login-form';
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WelcomeScreen } from '@/components/auth/welcome-screen';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginSuccess = (user: any) => {
    setWelcomeUser(user);
  };

  const handleWelcomeComplete = () => {
    if (welcomeUser.role === 'ADMIN') router.push('/admin');
    else if (welcomeUser.role === 'HOD') router.push('/admin');
    else if (welcomeUser.role === 'FACULTY') router.push('/lecturer');
    else if (welcomeUser.role === 'STUDENT') router.push('/student');
    else router.push('/dashboard');
  };

  return (
    <>
      <AnimatePresence>
        {!welcomeUser && (
          <motion.div 
            key="login"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-screen flex flex-col items-center justify-center bg-[#09090b] overflow-hidden selection:bg-indigo-500/30"
          >
            {/* Radial Background Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Subtle Particles */}
            {mounted && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/5 rounded-full"
                    style={{
                      width: Math.random() * 4 + 1 + 'px',
                      height: Math.random() * 4 + 1 + 'px',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10 w-full max-w-[420px] px-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Layers className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="space-y-1.5">
                  <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                  <p className="text-zinc-400 text-sm">Sign in to your university account to continue</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {welcomeUser && (
          <WelcomeScreen key="welcome" user={welcomeUser} onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>
    </>
  );
}
