import type { ArtistProfileSchema, ArtistWishSchema } from './artist.dto';

export interface ArtistResponseSchema {
  profile: ArtistProfileSchema;
  wish: ArtistWishSchema;
}

export interface ArtistNameResponseSchema {
  id: number;
  name: string;
  englishName: string;
  artistPageUrl: string;
}
