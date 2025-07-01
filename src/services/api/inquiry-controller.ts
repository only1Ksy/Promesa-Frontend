import type { InquirySchema } from '@/types/inquiry-controller';

import { axiosInstance, withErrorBoundary } from './axios';

export const fetchInquiries = (artistId: number) =>
  withErrorBoundary<[number], InquirySchema[]>(async (artistId: number) => {
    const res = await axiosInstance.get(`/inquiries?artistId=${artistId}`);
    return res.data.data;
  }, artistId);
