// mock API code

import { ITEM_LIST } from '@/lib/constants/temp-item-list';
import { CATEGORY_ID_KEYS, SORT_KEYS } from '@/types/params.dto';

export const fetchNowPopularItems = async () => {
  const data = ITEM_LIST.filter((item) => item.itemId >= 1900 && item.itemId < 2000);
  return { data };
};

export const fetchShopItems = async (params: Record<string, string | string[] | undefined>) => {
  const VALID_CATEGRY_ID_VALUES = CATEGORY_ID_KEYS.map(({ value }) => value);
  const VALID_SORT_VALUES = SORT_KEYS.map(({ value }) => value);
  type ValidCategoryId = (typeof VALID_CATEGRY_ID_VALUES)[number];
  type ValidSort = (typeof VALID_SORT_VALUES)[number];
  const isValidCategoryId = (v: string): v is ValidCategoryId => VALID_CATEGRY_ID_VALUES.includes(v as ValidCategoryId);
  const isValidSort = (v: string): v is ValidSort => VALID_SORT_VALUES.includes(v as ValidSort);

  const totalData = ITEM_LIST;

  const get = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : (v ?? '');
  };

  const categoryId = get('categoryId');
  const sort = get('sort');
  const page = Number(get('page'));

  if (!isValidCategoryId(categoryId) || !isValidSort(sort) || !page) return { data: null, meta: { totalPage: 0 } };

  const [sortField, sortOrder] = sort.split(',');

  // Filtering
  let filtered = totalData;

  if (categoryId !== '0') {
    const cat = Number(categoryId);
    const lower = cat * 100 + 1000;
    const upper = lower + 100;
    filtered = filtered.filter((item) => item.itemId >= lower && item.itemId < upper);
  }

  if (sortField === 'wishCount') {
    console.log('wishCount'); // need to filter
  }

  const sign = sortOrder === 'DESC' ? -1 : 1;
  filtered = filtered.sort((a, b) => (a.price - b.price) * sign);

  const PAGE_SIZE = 30;
  const totalPage = Math.ceil(filtered.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = filtered.slice(start, end);

  return { data: pageData, meta: { totalPage } };
};

export const fetchArtistItems = async (params: Record<string, string | string[] | undefined>) => {
  const VALID_CATEGRY_ID_VALUES = CATEGORY_ID_KEYS.map(({ value }) => value);
  const VALID_SORT_VALUES = SORT_KEYS.map(({ value }) => value);
  type ValidCategoryId = (typeof VALID_CATEGRY_ID_VALUES)[number];
  type ValidSort = (typeof VALID_SORT_VALUES)[number];
  const isValidCategoryId = (v: string): v is ValidCategoryId => VALID_CATEGRY_ID_VALUES.includes(v as ValidCategoryId);
  const isValidSort = (v: string): v is ValidSort => VALID_SORT_VALUES.includes(v as ValidSort);

  const totalData = ITEM_LIST;

  const get = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : (v ?? '');
  };

  const categoryId = get('categoryId');
  const sort = get('sort');
  const artistId = Number(get('artistId'));

  if (!isValidCategoryId(categoryId) || !isValidSort(sort) || !artistId) return { data: null };

  const [sortField, sortOrder] = sort.split(',');

  // Filtering
  let filtered = totalData;

  if (categoryId !== '0') {
    const cat = Number(categoryId);
    const lower = cat * 100 + 1000;
    const upper = lower + 100;
    filtered = filtered.filter((item) => item.itemId >= lower && item.itemId < upper);
  }

  if (sortField === 'wishCount') {
    console.log('wishCount'); // need to filter
  }

  const sign = sortOrder === 'DESC' ? -1 : 1;
  filtered = filtered.sort((a, b) => (a.price - b.price) * sign);

  // artist
  filtered = filtered.filter((item) => item.artistId === artistId);

  return { data: filtered };
};
