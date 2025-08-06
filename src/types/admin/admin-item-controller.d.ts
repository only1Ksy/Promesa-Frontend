export interface AdminRegisterItemRequest {
  itemName: string;
  price: number;
  stock: number;
  productCode: string;
  width: number;
  height: number;
  depth: number;
  artistId: number;
  categoryId: number;
  imageKeys: {
    key: string;
    sortOrder: number;
  }[];
  thumbnailKey: string;
}

export interface AdminUpdateItemRequest {
  itemName?: string;
  price?: number;
  stock?: number;
  productCode?: string;
  saleStatus?: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED';
  width?: number;
  height?: number;
  depth?: number;
  artistId?: number;
  categoryId?: number;
  imageKeys?: {
    key: string;
    sortOrder: number;
  }[];
  thumbnailKey?: string;
}
