import { create } from 'zustand';

interface ImageLoadingState {
  loadingCount: number;
  startLoading: () => void;
  endLoading: () => void;
}

export const useImageLoadingStore = create<ImageLoadingState>((set) => ({
  loadingCount: 0,
  startLoading: () => set((state) => ({ loadingCount: state.loadingCount + 1 })),
  endLoading: () => {
    set((s) => ({
      loadingCount: Math.max(0, s.loadingCount - 1),
    }));
  },
}));
