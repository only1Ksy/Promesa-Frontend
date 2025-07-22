import type { ExhibitionResponseSchema, ExhibitionSummarySchema } from '@/types/exhibition-controller';
import type { ItemPreviewResponseSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchExhibitions = (status: ExhibitionSummarySchema['status'] | 'ALL') =>
  withErrorBoundary<[ExhibitionSummarySchema['status'] | 'ALL'], ExhibitionResponseSchema[]>(async (status) => {
    const res = await axiosInstance.get(`/exhibitions${status === 'ALL' ? '' : `?status=${status}`}`);
    return res.data.data;
  }, status);

export const fetchOngoingExhibitions = () =>
  withErrorBoundary<[], ExhibitionSummarySchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions/ongoing');
    return res.data.data;
  });

export const fetchExhibitionItems = (exhibitionId: number) =>
  withErrorBoundary<[number], ItemPreviewResponseSchema[]>(async (exhibitionId) => {
    const res = await axiosInstance.get(`/exhibitions/${exhibitionId}/items`);
    return res.data.data;
  }, exhibitionId);
