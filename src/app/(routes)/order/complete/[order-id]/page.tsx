import { dehydrate } from '@tanstack/react-query';

import ClientOrderCompletePage from '@/components/client/order-complete/page';
import { fetchDetailedOrder } from '@/services/api/order-controller';
import { createQueryClient } from '@/services/query/server';

export default async function OrderCompletePage({
  params: paramsPromise,
}: {
  params: Promise<{ 'order-id': string }>;
}) {
  const params = await paramsPromise;
  const orderId = Number(params['order-id']);
  const queryClient = createQueryClient();

  // order 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: () => fetchDetailedOrder(orderId),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientOrderCompletePage orderId={orderId} orderDetailState={dehydratedState} />;
}
