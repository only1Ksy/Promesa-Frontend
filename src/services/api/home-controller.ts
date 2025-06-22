import { AxiosError } from 'axios';

import { BrandInfoSchema } from '@/types/home-controller.dto';

import { axiosInstance } from './axios';

export const fetchBrandInfo = async (): Promise<BrandInfoSchema | null> => {
  try {
    const res = await axiosInstance.get('/api/brand-info');
    const { data: body } = res;
    return body.data;
  } catch (error) {
    const err = error as AxiosError<{ code: string; reason: string }>;
    console.log(err);
    return null;
  }
};
