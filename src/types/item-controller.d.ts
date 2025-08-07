import { ArtistProfileSchema, ArtistWishSchema } from './artist.dto';
import { ImageUrls, ItemDetailSchema, ItemSalesSchema, ItemSummarySchema, ItemWishSchema } from './item.dto';

export interface ItemResponseSchema {
  itemSummary: ItemSummarySchema;
  itemDetail: ItemDetailSchema;
  itemWish: ItemWishSchema;
  artistProfile: ArtistProfileSchema;
  artistWish: ArtistWishSchema;
  itemSales: ItemSalesSchema;
}

export interface ItemPreviewResponseSchema {
  itemId: number;
  saleStatus: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED';
  itemName: string;
  itemDescription: string;
  price: number;
  imageUrl: string;
  artistName: string;
  wishCount: ItemWishSchema['wishCount'];
  wished: ItemWishSchema['isWishlisted'];
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

export interface DetailArtistResponseSchema {
  id: number;
  name: string;
  profileImageUrl: string;
  bio: string;
  instagramUrl: string;
  isWishlisted: boolean;
  wishCount: number;
}

// detail page
export interface ParsedItemData {
  itemId: number;
  title: string;
  mainImageUrls: ImageUrls[];
  detailImageUrls: ImageUrls[];
  category: {
    id: number;
    name: string;
  };
  averageRating: number;
  reviewCount: number;

  productCode: string;
  type: string;
  width: number;
  height: number;
  depth: number;

  isWishlisted: boolean;
  wishCount: number;

  artist: {
    id: number;
    name: string;
    profileImageUrl: string;
    bio: string;
    instagramUrl: string;
    isWishlisted: boolean;
    wishCount: number;
  };

  price: number;
  stock: number;
  saleStatus: 'ON_SALE' | 'SOLD_OUT' | 'STOPPED';
  freeShipping: boolean;
  shippingPolicy: string;
}
