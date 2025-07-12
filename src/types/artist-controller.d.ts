import type { ArtistProfileSchema, ArtistWishSchema } from './artist.dto';

export interface ArtistResponseSchema {
  profile: ArtistProfileSchema;
  wish: ArtistWishSchema;
}
