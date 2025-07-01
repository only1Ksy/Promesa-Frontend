import type { ExhibitionSchema } from '@/types/exhibition-controller';

import { axiosInstance, withErrorBoundary } from './axios';

export const fetchExhibitions = () =>
  withErrorBoundary<[], ExhibitionSchema[]>(async () => {
    const res = await axiosInstance.get('/exhibitions');
    return res.data.data;
  });
