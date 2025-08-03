import { AdminEditInquiryRequest, AdminNewInquiryRequest } from '@/types/admin/admin-inquiry-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 문의를 수정하는 함수
 * @param inquiryId 수정할 inquiry의 ID (URL path param)
 * @param payload 수정할 데이터 (AdminEditInquiryRequest)
 */
export const editInquiry = (inquiryId: number, payload: AdminEditInquiryRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.put(`/admin/inquiries/${inquiryId}`, payload);
    return res.data.data;
  });

/**
 * 문의를 삭제하는 함수
 * @param inquiryId 삭제할 문의 ID
 */
export const deleteInquiry = (inquiryId: number) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.delete(`/admin/inquiries/${inquiryId}`);
    return res.data;
  });

/**
 * 문의를 등록하는 함수
 * @param payload 등록할 데이터 (AdminNewInquiryRequest)
 */
export const postNewInquiry = (payload: AdminNewInquiryRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.put('/admin/inquiries', payload);
    return res.data.data;
  });
