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

export const useToggleWish = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<WishToggleSchema, Error, ToggleWishParams>({
    mutationFn: async ({ targetType, targetId, currentWished }) => {
      return await toggleWish(targetType, targetId, currentWished);
    },
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll()
        .filter((query) => query.isActive())
        .forEach((query) => queryClient.invalidateQueries({ queryKey: query.queryKey }));
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};
