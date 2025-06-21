import { ITEM_LIST } from '@/lib/constants/temp-item-list';
// import { REVIEW_LIST } from '@/lib/constants/temp-review-list';

export const fetchItemDetail = async (itemId: number) => {
  const item = ITEM_LIST.find((item) => item.itemId === itemId);

  if (!item) {
    return { data: null, error: '해당 상품을 찾을 수 없습니다.' };
  }

  return { data: item };
};

/* export const fetchItemReviews = async (itemId: number) => {
  const reviews = REVIEW_LIST.filter((review) => review.itemId === itemId);
  return reviews;
};
*/
