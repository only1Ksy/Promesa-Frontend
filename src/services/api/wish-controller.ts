import type { ArtistWishSchema } from '@/types/artist.dto';
import type { ItemWishSchema } from '@/types/item.dto';
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

export const fetchItemWish = (itemId: number) =>
  withErrorBoundary<[number], ItemWishSchema>(async (itemId) => {
    const res = await axiosInstance.get(`/wishes/item/${itemId}`);
    return res.data.data;
  }, itemId);

export const fetchArtistWish = (artistId: number) =>
  withErrorBoundary<[number], ArtistWishSchema>(async (artistId) => {
    const res = await axiosInstance.get(`/wishes/artist/${artistId}`);
    return res.data.data;
  }, artistId);
