export interface ItemSummarySchema {
  itemId: number;
  categoryId: number;
  categoryName: string;
  title: string;
  mainImageUrls: string[];
  detailImageUrls: string[];
  averageRating: number;
  reviewCount: number;
  artistId: number;
}

export interface ItemDetailSchema {
  productCode: string;
  type: string;
  width: number;
  height: number;
  depth: number;
}

export interface ItemWishSchema {
  isWishlisted: boolean;
  wishCount: number;
}

export interface ItemSalesSchema {
  stock: number;
  saleStatus: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED';
  price: number;
  freeShipping: boolean;
  shippingPolicy: string;
}
