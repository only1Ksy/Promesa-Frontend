export interface ItemPreviewSchema {
  itemId: number;
  itemName: string;
  itemDescription: string;
  price: number;
  imageKey: string;
  imageUrl: string;
  artistName: string;
  wished: boolean;
}

export interface ItemControllerParams {
  categoryId: number;
  page?: number;
  sort: string;
  artistId?: number;
  frame: string;
}

export interface ItemControllerServerParams extends Omit<ItemControllerParams, 'frame'> {
  size?: number;
}
