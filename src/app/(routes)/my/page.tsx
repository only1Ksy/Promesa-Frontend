import { dehydrate } from '@tanstack/react-query';

import ClientMyPage from '@/components/client/my/page';
import { fetchMe } from '@/services/api/member-controller';
import { fetchWishList } from '@/services/api/wish-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MyPage() {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['me'], queryFn: fetchMe }),
    queryClient.prefetchQuery({ queryKey: ['artistWishList', 'ARTIST'], queryFn: () => fetchWishList('ITEM') }),
    queryClient.prefetchQuery({ queryKey: ['itemWishList', 'ITEM'], queryFn: () => fetchWishList('ITEM') }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyPage dehydratedState={dehydratedState} />;
}
