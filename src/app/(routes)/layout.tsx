import { dehydrate } from '@tanstack/react-query';

import ClientRoutesLayout from '@/components/client/layout/routes-layout';
import { fetchCarts } from '@/services/api/cart-controller';
import { fetchParentCategories } from '@/services/api/category-controller';
import { createQueryClient } from '@/services/query/server';

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['itemCategories'],
      queryFn: fetchParentCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ['carts'],
      queryFn: fetchCarts,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientRoutesLayout dehydratedState={dehydratedState}>{children}</ClientRoutesLayout>;
}
