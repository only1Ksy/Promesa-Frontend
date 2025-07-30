import type { MemberResponseSchema } from '@/types/member-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchMe = () =>
  withErrorBoundary<[], MemberResponseSchema>(async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data.data;
  });
