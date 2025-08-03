import { AdminExhibitionRequest } from '@/types/admin/admin-exhibition-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 기획전 등록 API
 * @param payload 등록할 기획전 정보 (AdminExhibitionRequest)
 */
export const createExhibition = (payload: AdminExhibitionRequest) =>
  withErrorBoundary<[AdminExhibitionRequest], string>(async (payload) => {
    const res = await axiosInstance.post('/admin/exhibitions', payload);
    return res.data.data;
  }, payload);

/**
 * 기획전 수정 API
 * @param exhibitionId 수정할 기획전 ID
 * @param payload 수정할 기획전 정보 (AdminExhibitionRequest)
 */
export const editExhibition = (exhibitionId: number, payload: AdminExhibitionRequest) =>
  withErrorBoundary<[number, AdminExhibitionRequest], string>(
    async (exhibitionId, payload) => {
      const res = await axiosInstance.put(`/admin/exhibitions/${exhibitionId}`, payload);
      return res.data.data;
    },
    exhibitionId,
    payload,
  );
