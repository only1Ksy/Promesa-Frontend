import {
  AdminRegisterExhibitionRequest,
  AdminUpdateExhibitionRequest,
} from '@/types/admin/admin-exhibition-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 기획전 등록 API
 * @param payload 등록할 기획전 정보 (AdminExhibitionRequest)
 */
export const registerExhibition = (payload: AdminRegisterExhibitionRequest) =>
  withErrorBoundary<[AdminRegisterExhibitionRequest], boolean>(async (payload) => {
    const res = await axiosInstance.post('/admin/exhibitions', payload);
    return res.data.status;
  }, payload);

/**
 * 기획전 수정 API
 * @param exhibitionId 수정할 기획전 ID
 * @param payload 수정할 기획전 정보 (AdminExhibitionRequest)
 */
export const updateExhibition = (exhibitionId: number, payload: AdminUpdateExhibitionRequest) =>
  withErrorBoundary<[number, AdminUpdateExhibitionRequest], boolean>(
    async (exhibitionId, payload) => {
      const res = await axiosInstance.put(`/admin/exhibitions/${exhibitionId}`, payload);
      return res.data.status;
    },
    exhibitionId,
    payload,
  );
