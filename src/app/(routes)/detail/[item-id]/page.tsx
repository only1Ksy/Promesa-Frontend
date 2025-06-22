import { dehydrate } from '@tanstack/react-query';

import ClientDetailPage from '@/components/client/detail/page';
import { fetchItemDetail } from '@/services/api/item';
import { createQueryClient } from '@/services/query/server';

export default async function DetailPage({ params: paramsPromise }: { params: Promise<{ 'item-id': string }> }) {
  const params = await paramsPromise;
  const itemId = Number(params['item-id']);
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
  });

  const itemDetailState = dehydrate(queryClient, {
    shouldDehydrateQuery: (q) => q.queryKey[0] === 'itemDetail',
  });

  return <ClientDetailPage itemId={itemId} itemDetailState={itemDetailState} />;
}
