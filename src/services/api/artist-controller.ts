import type { ArtistSchema } from '@/types/artist-controller';

import { axiosInstance, withErrorBoundary } from './axios';

export const fetchArtist = (artistId: number) =>
  withErrorBoundary<[number], ArtistSchema>(async (artistId) => {
    const res = await axiosInstance.get(`/artists/${artistId}`);
    return res.data.data;
  }, artistId);
