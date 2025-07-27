import { ArtistResponseSchema } from './artist-controller';
import { ItemPreviewResponseSchema } from './item-controller';

export interface BrandInfoResponseSchema {
  mainImageUrl: string;
  leftImageUrl: string;
  rightImageUrl: string;
  brandStory: string;
}

export interface SearchResponseSchema {
  artists: ArtistResponseSchema[];
  itemPreviews: ItemPreviewResponseSchema[];
}
