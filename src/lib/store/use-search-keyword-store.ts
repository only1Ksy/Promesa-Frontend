import { create } from 'zustand';

interface SearchKeywordState {
  keyword: string;
  isCommitted: boolean;
  setKeyword: (value: string) => void;
  setCommitted: (value: boolean) => void;
}

export const useSearchKeywordStore = create<SearchKeywordState>((set) => ({
  keyword: '',
  isCommitted: false,
  setKeyword: (value) => set({ keyword: value }),
  setCommitted: (value) => set({ isCommitted: value }),
}));
