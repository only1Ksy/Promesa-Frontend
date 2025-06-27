// mock API

import { ITEM_LIST } from '@/lib/constants/temp-item-list';
import type { ItemControllerServerParams, ItemPreviewSchema } from '@/types/item-controller';

export const fetchNowPopularItems = async (): Promise<ItemPreviewSchema[]> => {
  const data = ITEM_LIST.filter((item) => item.itemId >= 1900 && item.itemId < 2000);
  return data;
};

export const fetchItems = async (
  params: ItemControllerServerParams,
): Promise<{ items: ItemPreviewSchema[]; totalPage: number }> => {
  const { categoryId, page, size, sort, artistId } = params;

  let data = ITEM_LIST;

  // categoryId
  if (categoryId > 0) {
    const lower = categoryId * 100 + 1000;
    const upper = lower + 100;
    data = data.filter((item) => item.itemId >= lower && item.itemId < upper);
  }

  // sort
  const [sortField, sortOrder] = sort.split(',');

  if (sortField === 'wishCount') {
    console.log('wishCount'); // need to filter
  }

  const sign = sortOrder === 'desc' ? -1 : 1;
  data = data.sort((a, b) => (a.price - b.price) * sign);

  // artistId
  if (artistId) {
    data = data.filter((item) => item.artistId === artistId);
  }

  // page + size
  let totalPage = 0;
  if (typeof page === 'number' && typeof size === 'number') {
    totalPage = Math.ceil(data.length / size); // totalPage = after filtering with categoryId and artistid
    const start = page * size;
    const end = start + size;
    data = data.slice(start, end);
  }

  return { items: data, totalPage };
};
