import type { ArtistSchema } from '@/types/artist-controller';
import type { ExhibitionSchema } from '@/types/exhibition-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchArtist = (artistId: number) =>
  withErrorBoundary<[number], ArtistSchema>(async (artistId) => {
    const res = await axiosInstance.get(`/artists/${artistId}`);
    return res.data.data;
  }, artistId);

export const fetchArtistExhibitions = (artistId: number) =>
  withErrorBoundary<[number], ExhibitionSchema[]>(async (artistId) => {
    const res = await axiosInstance.get(`/artists/${artistId}/exhibitions`);
    return res.data.data;
  }, artistId);
