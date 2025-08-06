import type { ImagePostRequestSchema, ImagePostResponseSchema } from '@/types/image-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const postImages = (payload: ImagePostRequestSchema) =>
  withErrorBoundary<[ImagePostRequestSchema], ImagePostResponseSchema[]>(async (payload) => {
    const res = await axiosInstance.post('/images', payload);
    return res.data.data;
  }, payload);

export const deleteImages = (key: string) =>
  withErrorBoundary<[string], boolean>(async (key) => {
    const res = await axiosInstance.delete(`/images?key=${key}`);
    return res.data.success;
  }, key);
