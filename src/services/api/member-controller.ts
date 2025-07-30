import type { MemberResponseSchema, MemberUpdateRequestSchema } from '@/types/member-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchMe = () =>
  withErrorBoundary<[], MemberResponseSchema>(async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data.data;
  });

export const patchMe = (payload: MemberUpdateRequestSchema) =>
  withErrorBoundary<[MemberUpdateRequestSchema], MemberResponseSchema>(async () => {
    const res = await axiosInstance.patch('/auth/me', payload);
    return res.data.data;
  }, payload);

export const patchMeWithdraw = () =>
  withErrorBoundary<[], boolean>(async () => {
    const res = await axiosInstance.patch('/auth/me/withdraw');
    return res.data.success;
  });
