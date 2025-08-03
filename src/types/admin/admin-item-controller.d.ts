export interface AdminItemRequest {
  itemName: string;
  price: number;
  stock: number;
  productCode: string;
  saleStatus: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED' | string;
  width: number;
  height: number;
  depth: number;
  artistId: number;
  categoryId: number;
  imageKeys: Array<{
    key: string;
    sortOrder: number;
  }>;
  thumbnailKey;
  string;
}
