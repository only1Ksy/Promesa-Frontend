import { dehydrate } from '@tanstack/react-query';

import ClientExhibitionPage from '@/components/client/exhibition/page';
import { fetchExhibition } from '@/services/api/exhibition-controller';
import { createQueryClient } from '@/services/query/server';

export default async function ExhibitionPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ 'exhibition-id': string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await paramsPromise;

  const raw = await searchParamsPromise;
  const frame = raw.frame && String(raw.frame) === 'masonry' ? 'masonry' : 'grid';

  const exhibitionId = Number(params['exhibition-id']);

  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['exhibition', exhibitionId], queryFn: () => fetchExhibition(exhibitionId) });

  const dehydratedState = dehydrate(queryClient);

  return <ClientExhibitionPage dehydratedState={dehydratedState} exhibitionId={exhibitionId} frame={frame} />;
}
