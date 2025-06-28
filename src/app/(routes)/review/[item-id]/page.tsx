import { dehydrate } from '@tanstack/react-query';

import ClientReviewPage from '@/components/client/review/page';
import { fetchItemDetail } from '@/services/api/item';
import { createQueryClient } from '@/services/query/server';

export default async function ReviewPage({ params: paramsPromise }: { params: Promise<{ 'item-id': string }> }) {
  const params = await paramsPromise;
  const itemId = Number(params['item-id']);
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['itemReview', itemId],
    queryFn: () => fetchItemDetail(itemId),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientReviewPage itemId={itemId} itemReviewState={dehydratedState} />;
}
