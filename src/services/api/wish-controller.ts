import type { TargetSchema, WishResponseSchema, WishToggleSchema } from '@/types/wish-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const toggleWish = (targetType: TargetSchema['targetType'], targetId: number, currentWished: boolean) =>
  withErrorBoundary<[TargetSchema['targetType'], number, boolean], WishToggleSchema>(
    async (targetType, targetId, currentWished) => {
      const url = `/wishes?targetType=${targetType}&targetId=${targetId}`;

      const res = currentWished ? await axiosInstance.delete(url) : await axiosInstance.post(url);
      return res.data.data;
    },
    targetType,
    targetId,
    currentWished,
  );

export const fetchWishList = (targetType: TargetSchema['targetType']) =>
  withErrorBoundary<[TargetSchema['targetType']], WishResponseSchema[]>(async (targetType) => {
    const res = await axiosInstance.get(`/wishes/list?targetType=${targetType}`);
    return res.data.data;
  }, targetType);
