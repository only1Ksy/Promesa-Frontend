import FrameGridIcon from '@/public/icons/item/frame-grid.svg';
import FrameMasonryIcon from '@/public/icons/item/frame-masonry.svg';

export interface ItemListCommon {
  categoryId: string;
  sort: string;
  frame: string;
}

export interface ShopItemListParams extends ItemListCommon {
  page: string;
}

export interface ArtistItemListParams extends ItemListCommon {
  artistId: string;
}

export type ItemListServerParams =
  | Pick<ShopItemListParams, 'categoryId' | 'sort' | 'page'>
  | Pick<ArtistItemListParams, 'categoryId' | 'sort' | 'artistId'>;

export const CATEGORY_ID_KEYS = [
  { label: 'ALL', value: '0' },
  { label: '컵/잔', value: '1' },
  { label: '그릇/사기', value: '2' },
  { label: '커피/티용품', value: '3' },
  { label: '화병', value: '4' },
  { label: '오브제', value: '5' },
  { label: '기타', value: '6' },
] as const;

export const SORT_KEYS = [
  { label: '높은 가격순', value: 'price,DESC' },
  { label: '낮은 가격순', value: 'price,ASC' },
  { label: '인기순', value: 'wishCount,DESC' },
] as const;

export const FRAME_KEYS = [
  { label: FrameGridIcon, value: 'grid' },
  { label: FrameMasonryIcon, value: 'masonry' },
] as const;
