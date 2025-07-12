export interface ItemSummarySchema {
  itemId: number;
  categoryId: number;
  categoryName: string;
  title: string;
  imageUrls: string[];
  averageRating: number;
  reviewCount: number;
  artistId: number;
}

export interface ItemDetailSchema {
  productCode: number;
  type: string;
  width: number;
  height: number;
  depth: number;
}

export interface ItemWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}
