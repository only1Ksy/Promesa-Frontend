export interface ArtistProfileSchema {
  artistId: number;
  name: string;
  profileImageUrl: string;
  bio: string;
  instagramUrl: string;
}

export interface ArtistWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}

export interface ItemSalesSchema {
  stockQuantitiy: number;
  isSoldOut: boolean;
  price: number;
  freeShipping: boolean;
  shippingPolicy: string;
}
