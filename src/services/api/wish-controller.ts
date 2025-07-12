import type { WishToggleSchema } from '@/types/wish-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const toggleWish = (
  targetType: WishToggleSchema['target']['targetType'],
  targetId: number,
  currentWished: boolean,
) =>
  withErrorBoundary<[WishToggleSchema['target']['targetType'], number, boolean], WishToggleSchema>(
    async (targetType, targetId, currentWished) => {
      const url = `/wishes?targetType=${targetType}&targetId=${targetId}`;

      const res = currentWished ? await axiosInstance.delete(url) : await axiosInstance.post(url);
      return res.data.data;
    },
    targetType,
    targetId,
    currentWished,
  );
