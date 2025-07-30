export interface CartSchema {
  cartItemId: number;
  itemId: number;
  quantity: number;
  name: string;
  artistName: string;
  price: number;
  thumbnailUrl: string;
  stock: number;
  saleStatus: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED';
}

export interface CartRequest {
  itemId: number;
  quantity: number;
}

export type CartResponse = CartSchema[];
