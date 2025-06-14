// mock API code

import { ITEM_LIST } from '@/lib/constants/temp-item-list';
import type { Item } from '@/types/item.dto';

type ItemId = Item['itemId'];

export async function toggleWishRequest(itemId: ItemId) {
  const item = ITEM_LIST.find((i) => i.itemId === itemId);
  if (item) item.isWished = !item.isWished;

  return { wished: !!item?.isWished };
}
