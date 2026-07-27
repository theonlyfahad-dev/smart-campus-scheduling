'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function WelcomeScreen({ user, onComplete }: { user: any, onComplete: () => void }) {
  const router = useRouter();

  useEffect(() => {
    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Framer Motion variant for a premium wave animation on an SVG character arm
  const waveAnimation = {
    rotate: [0, 15, -10, 15, -5, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.5,
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Premium Abstract Character (Upper Half) */}
        <div className="relative w-48 h-48 mb-8 flex justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <path d="M50 200C50 144.772 94.7715 100 150 100H50V200Z" fill="url(#paint0_linear)" />
            <path d="M150 200C150 144.772 105.228 100 50 100H150V200Z" fill="url(#paint1_linear)" />
            {/* Head */}
            <circle cx="100" cy="70" r="40" fill="url(#paint2_linear)" />
            {/* Waving Arm */}
            <motion.g 
              style={{ originX: 0.2, originY: 0.8 }}
              animate={waveAnimation}
            >
              <path d="M140 120 Q 180 80 160 50" stroke="url(#paint3_linear)" strokeWidth="16" strokeLinecap="round" />
            </motion.g>
            
            <defs>
              <linearGradient id="paint0_linear" x1="50" y1="100" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="150" y1="100" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#4338ca" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="60" y1="30" x2="140" y2="110" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e0e7ff" />
                <stop offset="1" stopColor="#c7d2fe" />
              </linearGradient>
              <linearGradient id="paint3_linear" x1="140" y1="120" x2="160" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white mb-3">
            👋 Hi, {user?.userId || 'there'}
          </h2>
          <p className="text-zinc-400 text-lg">
            Welcome back! Have a productive day.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
