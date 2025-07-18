import { axiosInstance } from './axios/instance';
import { withErrorBoundary } from './axios/instance';

/** 기본 배송지 정보를 반환하는 함수*/
export const fetchDefaultAddress = () =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.get(`/addresses`);
    return res.data.data;
  });
