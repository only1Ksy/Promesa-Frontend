'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { toggleWish } from '@/services/api/wish-controller';
import { HttpError } from '@/types/axios.dto';
import type { WishToggleSchema } from '@/types/wish-controller';

interface ToggleWishParams {
  targetType: WishToggleSchema['target']['targetType'];
  targetId: number;
  currentWished: boolean;
}

const QUERY_KEYS_BY_TARGET_TYPE: Record<WishToggleSchema['target']['targetType'], string[]> = {
  ARTIST: [
    'itemDetail', // /detail/[item-id]
    'artist', // /artist/[artist-id]
    'artistList', // /home/artists
    'artistWishList', // /my
  ],
  ITEM: [
    'nowPopularItems', // /home
    'items', // /shop, /artist/[artist-id]
    'itemDetail', // /detail/[item-id]
    'artist', // /artist/[artist-id]
    'itemWishList', // /my
  ],
};

export const useToggleWish = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<WishToggleSchema, Error, ToggleWishParams>({
    mutationFn: async ({ targetType, targetId, currentWished }) => {
      return await toggleWish(targetType, targetId, currentWished);
    },
    onSuccess: (_data, { targetType }) => {
      const targetQueryKeys = QUERY_KEYS_BY_TARGET_TYPE[targetType] ?? [];

      queryClient
        .getQueryCache()
        .findAll()
        .forEach((query) => {
          const key = query.queryKey[0];
          if (typeof key === 'string' && targetQueryKeys.includes(key)) {
            queryClient.invalidateQueries({ queryKey: query.queryKey });
          }
        });
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};
