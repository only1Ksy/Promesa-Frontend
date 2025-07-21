import { create } from 'zustand';

import { fetchIsLoggedIn } from '@/services/api/axios/auth';

interface AuthState {
  isLoggedIn: boolean;
  hasChecked: boolean;
  checkLogin: () => Promise<void>;
  setLoggedIn: (value: boolean) => void;
  setHasChecked: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  hasChecked: false,

  checkLogin: async () => {
    if (get().hasChecked) return;

    const result = await fetchIsLoggedIn();
    set({ isLoggedIn: result, hasChecked: true });
  },

  setLoggedIn: (value: boolean) => {
    set({ isLoggedIn: value, hasChecked: true });
  },

  setHasChecked: (value: boolean) => {
    set({ hasChecked: value });
  },
}));
