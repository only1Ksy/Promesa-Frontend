import type { MemberProfileSchema } from '@/types/member-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchMe = () =>
  withErrorBoundary<[], MemberProfileSchema>(async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data.data;
  });
