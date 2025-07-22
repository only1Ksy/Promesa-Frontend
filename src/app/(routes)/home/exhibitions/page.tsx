import { dehydrate } from '@tanstack/react-query';

import ClientHomeExihibitionsPage from '@/components/client/home-exhibitions/page';
import { fetchExhibitions } from '@/services/api/exhibition-controller';
import { createQueryClient } from '@/services/query/server';
import type { ExhibitionSummarySchema } from '@/types/exhibition-controller';

export default async function HomeExhibitionsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParamsPromise;

  const status = raw.status ? (String(raw.status) as ExhibitionSummarySchema['status']) : 'ALL';

  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['exhibitionList', status], queryFn: () => fetchExhibitions(status) });

  const dehydratedState = dehydrate(queryClient);

  return <ClientHomeExihibitionsPage dehydratedState={dehydratedState} status={status} />;
}
