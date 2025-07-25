import { dehydrate } from '@tanstack/react-query';

import ClientMyWishListPage from '@/components/client/my/wish-list/page';
import { fetchWishList } from '@/services/api/wish-controller';
import { createQueryClient } from '@/services/query/server';

export default function WishListPage() {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['itemWishList', 'ITEM'], queryFn: () => fetchWishList('ITEM') });

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyWishListPage dehydratedState={dehydratedState} />;
}
