import { AdminExhibitionRequest } from '@/types/admin/admin-exhibition-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 기획전 등록 API
 * @param payload 등록할 기획전 정보 (AdminExhibitionRequest)
 */
export const createExhibition = (payload: AdminExhibitionRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.post('/admin/exhibitions', payload);
    return res.data;
  });
