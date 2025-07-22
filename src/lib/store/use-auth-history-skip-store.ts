import { create } from 'zustand';

interface AuthHistorySkipState {
  isSkipping: boolean;
  skipCount: number;
  startSkip: () => void;
  resetSkip: () => void;
  increment: () => void;
}

export const useAuthHistorySkipStore = create<AuthHistorySkipState>((set) => ({
  isSkipping: false,
  skipCount: 0,
  startSkip: () => set({ isSkipping: true, skipCount: 0 }),
  increment: () => set((state) => ({ skipCount: state.skipCount + 1 })),
  resetSkip: () => set({ isSkipping: false, skipCount: 0 }),
}));
