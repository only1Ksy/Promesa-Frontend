// mock API code

import { ITEM_LIST } from '@/lib/constants/temp-item-list';

export const fetchThumbnailItems = async () => {
  const data = ITEM_LIST.filter((item) => item.itemId >= 1800 && item.itemId < 1900);
  return { data };
};

export const fetchNowPopularItems = async () => {
  const data = ITEM_LIST.filter((item) => item.itemId >= 1900 && item.itemId < 2000);
  return { data };
};
