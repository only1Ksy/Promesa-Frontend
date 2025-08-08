'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useToast } from '@/components/common/alert/toast-provider';
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
    // 'items', // /shop, /artist/[artist-id]
    'itemDetail', // /detail/[item-id]
    'artist', // /artist/[artist-id]
    'itemWishList', // /my, /my.wish-list
    'exhibition', // /exhibition/[exhibition-id]
    'search', // /search
  ],
};

export const useToggleWish = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMutation<WishToggleSchema, Error, ToggleWishParams>({
    mutationFn: async ({ targetType, targetId, currentWished }) => {
      return await toggleWish(targetType, targetId, currentWished);
    },
    onSuccess: (_data, { targetType, currentWished }) => {
      const targetQueryKeys = QUERY_KEYS_BY_TARGET_TYPE[targetType] ?? [];

      queryClient
        .getQueryCache()
        .findAll()
        .forEach((query) => {
          const key = query.queryKey[0];
          if (typeof key === 'string' && targetQueryKeys.includes(key)) {
            queryClient.invalidateQueries({ queryKey: query.queryKey });
          }

          // stale
          queryClient.invalidateQueries({
            queryKey: ['items'],
            refetchType: 'none',
          });

          // show toast pop-up
          const toastTarget = targetType === 'ITEM' ? '위시리스트' : '아티스트 북마크';
          const toastAction = currentWished ? '에서 삭제했습니다' : '에 추가했습니다';
          showToast(`${toastTarget}${toastAction}.`);
        });
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(
          `/login?afterLogin=${encodeURIComponent(`${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`)}`,
        );
      }
    },
  });
};
