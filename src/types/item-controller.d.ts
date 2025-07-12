import { ArtistProfileSchema, ArtistWishSchema, ItemSalesSchema } from './artist.dto';
import { ItemDetailSchema, ItemSummarySchema, ItemWishSchema } from './item.dto';

export interface ItemResponseSchema {
  itemSummary: ItemSummarySchema;
  itemDetail: ItemDetailSchema;
  itemWish: ItemWishSchema;
  artistProfile: ArtistProfileSchema;
  artistWish: ArtistWishSchema;
  itemSales: ItemSalesSchema;
}

export interface ItemPreviewResonseSchema {
  itemId: number;
  itemName: string;
  itemDescription: string;
  price: number;
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
