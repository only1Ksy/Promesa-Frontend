import type { MemberResponseSchema } from '@/types/member-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

export const fetchMembers = () =>
  withErrorBoundary<[], MemberResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/admin/members');
    return res.data.data;
  });
