import { REVIEW_LIST } from '@/lib/constants/temp-review-list';
/* export const fetchItemReviews = async (itemId: number) => {
  const reviews = REVIEW_LIST.filter((review) => review.itemId === itemId);
  return reviews;
};
*/
export const fetchItemReviews = async () => {
  const reviews = REVIEW_LIST;

  if (!reviews) {
    return { data: null, error: '해당 상품의 리뷰를 찾을 수 없습니다.' };
  }

  return { data: reviews };
};
