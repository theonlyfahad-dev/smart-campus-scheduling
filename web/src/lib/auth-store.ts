import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';

export interface User {
  id: string;
  userId: string;
  role: UserRole;
  departmentId: string | null;
  isFirstLogin: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'stt-auth-storage',
    }
  )
);
