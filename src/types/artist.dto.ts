export interface ArtistProfileSchema {
  artistId: number;
  name: string;
  subname: string;
  profileImageUrl: string;
  bio: string;
  instagramUrl: string;
}

export interface ArtistWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}
