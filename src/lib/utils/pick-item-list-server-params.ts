import type { ArtistItemListParams, ItemListServerParams, ShopItemListParams } from '@/types/params.dto';

export const isArtistParams = (params: ShopItemListParams | ArtistItemListParams): params is ArtistItemListParams =>
  'artistId' in params && !!params.artistId;

export default function pickItemListServerParams(
  params: ShopItemListParams | ArtistItemListParams,
): ItemListServerParams {
  return isArtistParams(params)
    ? { categoryId: params.categoryId, sort: params.sort, artistId: params.artistId }
    : { categoryId: params.categoryId, sort: params.sort, page: params.page };
}
