'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { toggleWish } from '@/services/api/wish-controller';
import { HttpError } from '@/types/axios.dto';
import type { ItemControllerServerParams } from '@/types/item-controller';
import type { WishToggleSchema } from '@/types/wish-controller';

interface ToggleWishParams {
  targetType: WishToggleSchema['target']['targetType'];
  targetId: number;
  currentWished: boolean;
}

interface ToggleWishResult {
  wished: boolean;
  wishCount: number;
}

export const useToggleWish = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<ToggleWishResult, Error, ToggleWishParams>({
    mutationFn: async ({ targetType, targetId, currentWished }) => {
      const data = await toggleWish(targetType, targetId, currentWished);
      return {
        wished: data.wished,
        wishCount: data.target.wishCount,
      };
    },
    onSuccess: () => {
      // need to refetch if active
      const queries = queryClient
        .getQueryCache()
        .findAll()
        .filter((query) => query.isActive());

      for (const query of queries) {
        const key = query.queryKey;
        if (
          // shop/artist items - sort w/ wishCount
          (key[0] === 'items' &&
            typeof key[1] === 'object' &&
            (key[1] as ItemControllerServerParams).sort.split(',')[0] === 'wishCount') ||
          // artist list
          key[0] === 'artistList' ||
          // wish list (artist, item)
          key[0] === 'artistWishList' ||
          key[0] === 'itemWishList'
        ) {
          queryClient.invalidateQueries({ queryKey: key });
        }
      }

      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};
