import { dehydrate } from '@tanstack/react-query';

import ClientSearchPage from '@/components/client/search/page';
import { fetchSearch } from '@/services/api/home-controller';
import { createQueryClient } from '@/services/query/server';

export default async function SearchPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParamsPromise;
  const keyword = raw.keystring ? String(raw.keyword) : '';

  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['search', keyword], queryFn: () => fetchSearch(keyword) });

  const dehydratedState = dehydrate(queryClient);

  return <ClientSearchPage dehydratedState={dehydratedState} keyword={keyword} />;
}
