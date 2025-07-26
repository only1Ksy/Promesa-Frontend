import { dehydrate } from '@tanstack/react-query';

import ClientCartPage from '@/components/client/cart/page';
import { fetchCarts } from '@/services/api/cart-controller';
import { createQueryClient } from '@/services/query/server';

export default async function CartPage() {
  const queryClient = createQueryClient();

  // 장바구니 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCarts(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientCartPage cartsState={dehydratedState} />;
}
