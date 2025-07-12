import type { ArtistResponseSchema } from '@/types/artist-controller';
import type { ExhibitionResponseSchema } from '@/types/exhibition-controller';
import type { ItemControllerServerParams, ItemPreviewResponseSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchArtist = (artistId: number) =>
  withErrorBoundary<[number], ArtistResponseSchema>(async (artistId) => {
    const res = await axiosInstance.get(`/artists/${artistId}`);
    return res.data.data;
  }, artistId);

export const fetchArtistExhibitions = (artistId: number) =>
  withErrorBoundary<[number], ExhibitionResponseSchema[]>(async (artistId) => {
    const res = await axiosInstance.get(`/artists/${artistId}/exhibitions`);
    return res.data.data;
  }, artistId);

export const fetchArtistItems = (params: ItemControllerServerParams) =>
  withErrorBoundary<[ItemControllerServerParams], { content: ItemPreviewResponseSchema[]; totalPages: number }>(
    async (params) => {
      const { artistId, categoryId, sort } = params;
      const res = await axiosInstance.get(`/artists/${artistId}/categories/${categoryId}/items?sort=${sort}`);
      return { content: res.data.data, totalPages: 1 }; // same format with fetchShopItems
    },
    params,
  );
