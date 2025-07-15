import { dehydrate } from '@tanstack/react-query';

import ClientRoutesLayout from '@/components/client/layout/routes-layout';
import { fetchParentCategories } from '@/services/api/category-controller';
import { createQueryClient } from '@/services/query/server';

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({
    queryKey: ['itemCategories'],
    queryFn: fetchParentCategories,
  });

  const dehydratedState = dehydrate(queryClient);

  return <ClientRoutesLayout dehydratedState={dehydratedState}>{children}</ClientRoutesLayout>;
}
