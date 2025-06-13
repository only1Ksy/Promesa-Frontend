export interface Item {
  itemId: number;
  itemName: string;
  itemDescription: string;
  price: number;
  thumbnailUrl: string;
  artistName: string;
  isWished: boolean;
  sale: number; // not in swagger
}
