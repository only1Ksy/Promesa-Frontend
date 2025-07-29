import { dehydrate } from '@tanstack/react-query';

import ClientMyReviewPage from '@/components/client/my/review/page';
import { fetchMyEligibleReviews, fetchMyWrittenReviews } from '@/services/api/review-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MyPage() {
  const queryClient = createQueryClient();

  await Promise.all([queryClient.prefetchQuery({ queryKey: ['writtenReviews'], queryFn: fetchMyWrittenReviews })]);
  await Promise.all([queryClient.prefetchQuery({ queryKey: ['eligibleReviews'], queryFn: fetchMyEligibleReviews })]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyReviewPage myReviewsState={dehydratedState} />;
}
