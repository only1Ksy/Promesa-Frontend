// import { dehydrate } from '@tanstack/react-query';
import ClientMyReviewPage from '@/components/client/my/review/page';

export default async function MyPage() {
  /* const queryClient = createQueryClient();

  await Promise.all([queryClient.prefetchQuery({ queryKey: ['me'], queryFn: fetchMe })]);

  const dehydratedState = dehydrate(queryClient); */

  return <ClientMyReviewPage />;
}
