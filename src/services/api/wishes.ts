// mock API code

import { ITEM_LIST } from '@/lib/constants/temp-item-list';

type ItemId = number;

export async function toggleWishRequest(itemId: ItemId) {
  const item = ITEM_LIST.find((i) => i.itemId === itemId);
  if (item) item.isWished = !item.isWished;

  return { wished: !!item?.isWished };
}
