export interface ItemPreviewSchema {
  itemId: number;
  itemName: string;
  itemDescription: string;
  price: number;
  thumbnailUrl: string;
  artistId: number; // not in swagger
  artistName: string;
  isWished: boolean;
}

export interface ItemControllerParams {
  categoryId: number;
  page?: number;
  size?: number;
  sort: string;
  artistId?: number;
  frame: string;
}

export type ItemControllerServerParams = Omit<ItemControllerParams, 'frame'>;
