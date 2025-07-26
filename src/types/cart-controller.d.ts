export interface CartSchema {
  cartItemId: number;
  itemId: number;
  quantity: number;
  name: string;
  artistName: string;
  price: number;
  thumbnailUrl: string;
}

export type CartResponse = CartSchema[];
