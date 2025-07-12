import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleWish } from '@/services/api/wish-controller';
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

export const useToggleWish = () => {
  const queryClient = useQueryClient();

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
    },
  });
};
