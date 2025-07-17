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

interface ToggleWishResult {
  wished: boolean;
  wishCount: number;
}

interface UseToggleWishOptions {
  queryKeyList?: unknown[][];
}

export const useToggleWish = ({ queryKeyList = [] }: UseToggleWishOptions = {}) => {
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
    onSuccess: (_data, { targetType, targetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['toggleWish', targetType, targetId],
      });

      for (const queryKey of queryKeyList) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });
};
