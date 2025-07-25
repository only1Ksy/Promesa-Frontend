import { dehydrate } from '@tanstack/react-query';

import ClientMyOrderPage from '@/components/client/my/order/page';
import { fetchOrders } from '@/services/api/order-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MyOrderPage() {
  const queryClient = createQueryClient();

  // 주문 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyOrderPage ordersState={dehydratedState} />;
}
