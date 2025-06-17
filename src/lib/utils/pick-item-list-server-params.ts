import type { ItemListParams, ItemListServerParams } from '@/types/params.dto';

export default function pickItemListServerParams(params: ItemListParams): ItemListServerParams {
  const { categoryId, sort, page } = params;
  return { categoryId, sort, page };
}
