import type { InquiryResponseSchema } from '@/types/inquiry-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchInquiries = (artistId: number) =>
  withErrorBoundary<[number], InquiryResponseSchema[]>(async (artistId: number) => {
    const res = await axiosInstance.get(`/inquiries?artistId=${artistId}`);
    return res.data.data;
  }, artistId);
