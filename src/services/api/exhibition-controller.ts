import type { ExhibitionResponseSchema } from '@/types/exhibition-controller';
import type { ItemPreviewResonseSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchExhibitions = () =>
  withErrorBoundary<[], ExhibitionResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions');
    return res.data.data;
  });

export const fetchExhibitionItems = (exhibitionId: number) =>
  withErrorBoundary<[number], ItemPreviewResonseSchema>(async (exhibitionId) => {
    const res = await axiosInstance.get(`/exhibitions/${exhibitionId}/items`);
    return res.data.data;
  }, exhibitionId);
