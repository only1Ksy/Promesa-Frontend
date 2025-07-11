import type { ExhibitionSchema } from '@/types/exhibition-controller';
import type { ItemPreviewSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchExhibitions = () =>
  withErrorBoundary<[], ExhibitionSchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions');
    return res.data.data;
  });

export const fetchExhibitionItems = (exhibitionId: number) =>
  withErrorBoundary<[number], ItemPreviewSchema>(async (exhibitionId) => {
    const res = await axiosInstance.get(`/exhibitions/${exhibitionId}/items`);
    return res.data.data;
  }, exhibitionId);
