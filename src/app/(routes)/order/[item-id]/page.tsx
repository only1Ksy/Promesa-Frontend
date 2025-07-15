import { dehydrate } from '@tanstack/react-query';

import ClientOrderPage from '@/components/client/order/page';
import { fetchItemDetail } from '@/services/api/item-controller';
import { createQueryClient } from '@/services/query/server';

export default async function OrderItemPage({ params: paramsPromise }: { params: Promise<{ 'item-id': string }> }) {
  const params = await paramsPromise;
  const itemId = Number(params['item-id']);
  const queryClient = createQueryClient();

  // 1. 상품 정보 prefetch
  await queryClient.prefetchQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientOrderPage itemId={itemId} itemDetailState={dehydratedState} />;
}
