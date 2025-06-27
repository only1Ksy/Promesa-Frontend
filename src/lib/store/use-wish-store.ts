import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ItemId = number;

interface WishStore {
  wishedIds: ItemId[];
  toggleWish: (itemId: ItemId) => void;
}

export const useWishStore = create<WishStore>()(
  persist(
    (set) => ({
      wishedIds: [],
      toggleWish: (itemId) =>
        set((state) => ({
          wishedIds: state.wishedIds.includes(itemId)
            ? state.wishedIds.filter((id) => id !== itemId)
            : [...state.wishedIds, itemId],
        })),
    }),
    {
      name: 'wish-store',
    },
  ),
);
