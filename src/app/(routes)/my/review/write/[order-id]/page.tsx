import { dehydrate } from '@tanstack/react-query';

import ClientReviewWritePage from '@/components/client/my/review/write/page';
import { fetchMyEligibleReviews } from '@/services/api/review-controller';
import { createQueryClient } from '@/services/query/server';

export default async function DetailPage({ params: paramsPromise }: { params: Promise<{ 'order-id': string }> }) {
  const params = await paramsPromise;
  const orderId = Number(params['order-id']);

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['eligibleReviews'],
    queryFn: () => fetchMyEligibleReviews(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientReviewWritePage orderId={orderId} orderDetailState={dehydratedState} />;
}
