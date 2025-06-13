import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Item } from '@/types/item.dto';

type itemId = Item['itemId'];

interface WishStore {
  wishedIds: itemId[];
  toggleWish: (itemId: itemId) => void;
  isWished: (itemId: itemId) => boolean;
}

export const useWishStore = create<WishStore>()(
  persist(
    (set, get) => ({
      wishedIds: [],
      toggleWish: (itemId) =>
        set((state) => ({
          wishedIds: state.wishedIds.includes(itemId)
            ? state.wishedIds.filter((id) => id !== itemId)
            : [...state.wishedIds, itemId],
        })),
      isWished: (itemId) => get().wishedIds.includes(itemId),
    }),
    {
      name: 'wish-store',
    },
  ),
);
