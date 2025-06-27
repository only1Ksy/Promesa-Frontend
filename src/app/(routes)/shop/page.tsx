import { dehydrate } from '@tanstack/react-query';

import ClientShopPage from '@/components/client/shop/page';
import { fetchCategoryParent } from '@/services/api/category-controller';
import { fetchItems } from '@/services/api/item-controller';
import { createQueryClient } from '@/services/query/server';
import type { ItemControllerParams, ItemControllerServerParams } from '@/types/item-controller';

export default async function ShopPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParamsPromise;

  const initialParams: ItemControllerParams = {
    categoryId: Number(raw.categoryId) || 0,
    page: Number(raw.page) || 0,
    size: Number(raw.size) || 20,
    sort: raw.sort ? String(raw.sort) : 'price,desc',
    frame: raw.frame ? String(raw.frame) : 'grid',
  };

  const serverParams: ItemControllerServerParams = {
    ...(initialParams as Omit<ItemControllerParams, 'frame'>),
  };

  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['items', serverParams],
      queryFn: () => fetchItems(serverParams),
    }),
    queryClient.prefetchQuery({
      queryKey: ['categoryParent'],
      queryFn: fetchCategoryParent,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientShopPage dehydratedState={dehydratedState} initialParams={initialParams} />;
}
