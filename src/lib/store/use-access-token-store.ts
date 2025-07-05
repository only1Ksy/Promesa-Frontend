import { create } from 'zustand';

interface AccessTokenState {
  accessToken: string | null;

  setAccessToken: (token: string) => void;
  clear: () => void;
}

export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  accessToken: null,

  setAccessToken: (token) => set({ accessToken: token }),

  clear: () =>
    set({
      accessToken: null,
    }),
}));
