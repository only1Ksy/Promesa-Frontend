import { dehydrate } from '@tanstack/react-query';

import ClientDetailPage from '@/components/client/detail/page';
import { fetchItemDetail } from '@/services/api/item';
import { fetchItemReviews } from '@/services/api/review-controller';
import { createQueryClient } from '@/services/query/server';

export default async function DetailPage({ params: paramsPromise }: { params: Promise<{ 'item-id': string }> }) {
  const params = await paramsPromise;
  const itemId = Number(params['item-id']);
  const queryClient = createQueryClient();

  // 1. 상품 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
  });

  // 2. 리뷰 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['itemReviews', itemId],
    queryFn: () => fetchItemReviews(itemId),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientDetailPage itemId={itemId} itemDetailState={dehydratedState} />;
}
