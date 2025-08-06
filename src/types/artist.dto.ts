export interface ArtistProfileSchema {
  artistId: number;
  name: string;
  subname: string | null;
  profileImageUrl: string;
  bio: string;
  instagramUrl: string | null;
}

export interface ArtistWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}
