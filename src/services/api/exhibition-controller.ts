import type {
  ExhibitionDetailResponseSchema,
  ExhibitionSummaryResponseSchema,
  ExhibitionSummarySchema,
} from '@/types/exhibition-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchExhibitions = (status: ExhibitionSummarySchema['status'] | 'ALL') =>
  withErrorBoundary<[ExhibitionSummarySchema['status'] | 'ALL'], ExhibitionSummaryResponseSchema[]>(async (status) => {
    const res = await axiosInstance.get(`/exhibitions${status === 'ALL' ? '' : `?status=${status}`}`);
    return res.data.data;
  }, status);

export const fetchOngoingExhibitions = () =>
  withErrorBoundary<[], ExhibitionSummaryResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions?status=ONGOING');
    return res.data.data;
  });

export const fetchExhibition = (exhibitionId: number) =>
  withErrorBoundary<[number], ExhibitionDetailResponseSchema>(async (exhibitionId) => {
    const res = await axiosInstance.get(`/exhibitions/${exhibitionId}`);
    return res.data.data;
  }, exhibitionId);
