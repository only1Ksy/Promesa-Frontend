'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useWishStore } from '@/lib/store/use-wish-store';
import { toggleWishRequest } from '@/services/api/wishes';

type ItemId = number;

const QUERY_KEYS = [['nowPopularItems'], ['items']];

export const useToggleWish = () => {
  const { toggleWish } = useWishStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishRequest,
    onMutate: async (itemId: ItemId) => {
      toggleWish(itemId);
      await Promise.all(QUERY_KEYS.map((key) => queryClient.cancelQueries({ queryKey: key })));
      return { itemId };
    },
    onError: (_err, _itemId, ctx) => {
      if (ctx) toggleWish(ctx.itemId);
    },
    onSettled: () => QUERY_KEYS.forEach((key) => queryClient.invalidateQueries({ queryKey: key })),
  });
};
