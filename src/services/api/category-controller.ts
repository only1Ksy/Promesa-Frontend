// mock API

import type { CategorySchema } from '@/types/category-controller';

export const fetchCategoryParent = async (): Promise<CategorySchema[]> => {
  return [
    { id: 0, name: 'ALL' },
    { id: 1, name: '컵/잔' },
    { id: 2, name: '그릇/사기' },
    { id: 3, name: '커피/티용품' },
    { id: 4, name: '화병' },
    { id: 5, name: '오브제' },
    { id: 6, name: '기타' },
  ];
};
