import { dehydrate } from '@tanstack/react-query';

import ClientShopPage from '@/components/client/shop/page';
import pickItemListServerParams from '@/lib/utils/pick-item-list-server-params';
import { fetchShopItems } from '@/services/api/items';
import { createQueryClient } from '@/services/query/server';
import type { ShopItemListParams } from '@/types/params.dto';

export default async function ShopPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParamsPromise;
  const norm = (v: string | string[] | undefined): string => (Array.isArray(v) ? v[0] : (v ?? ''));

  const initialParams: ShopItemListParams = {
    categoryId: norm(raw.categoryId) || '0',
    sort: norm(raw.sort) || 'price,DESC',
    page: norm(raw.page) || '1',
    frame: norm(raw.frame) || 'grid',
  };

  const serverParams = pickItemListServerParams(initialParams);

  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['shopItems', serverParams],
    queryFn: () => fetchShopItems(serverParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientShopPage dehydratedState={dehydratedState} initialParams={initialParams} />;
}
