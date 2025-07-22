import type { ExhibitionResponseSchema } from '@/types/exhibition-controller';
import type { ItemPreviewResponseSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchOngoingExhibitions = () =>
  withErrorBoundary<[], ExhibitionResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions/ongoing');
    return res.data.data;
  });

export const fetchExhibitionItems = (exhibitionId: number) =>
  withErrorBoundary<[number], ItemPreviewResponseSchema>(async (exhibitionId) => {
    const res = await axiosInstance.get(`/exhibitions/${exhibitionId}/items`);
    return res.data.data;
  }, exhibitionId);
