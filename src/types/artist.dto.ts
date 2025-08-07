export interface ArtistProfileSchema {
  artistId: number;
  name: string;
  subname: string | null;
  profileImageKey: string;
  profileImageUrl: string;
  bio: string;
  instagramUrl: string | null;
}

export interface ArtistWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}
