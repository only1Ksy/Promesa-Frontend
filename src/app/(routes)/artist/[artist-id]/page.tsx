import { dehydrate } from '@tanstack/react-query';

import ClientArtistPage from '@/components/client/artist/page';
import pickItemListServerParams from '@/lib/utils/pick-item-list-server-params';
import { fetchArtistInformation } from '@/services/api/artist';
import { fetchExhibitions } from '@/services/api/exhibitions';
import { fetchArtistItems } from '@/services/api/items';
import { createQueryClient } from '@/services/query/server';
import type { ArtistItemListParams } from '@/types/params.dto';

export default async function ArtistPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ 'artist-id': string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await paramsPromise;
  const raw = await searchParamsPromise;
  const norm = (v: string | string[] | undefined): string => (Array.isArray(v) ? v[0] : (v ?? ''));

  const initialParams: ArtistItemListParams = {
    categoryId: norm(raw.categoryId) || '0',
    sort: norm(raw.sort) || 'price,DESC',
    artistId: params['artist-id'], // artistId
    frame: norm(raw.frame) || 'grid',
  };

  const artistId = Number(params['artist-id']);
  const serverParams = pickItemListServerParams(initialParams);

  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['artistInformation', artistId],
      queryFn: () => fetchArtistInformation(artistId),
    }),
    queryClient.prefetchQuery({
      queryKey: ['artistItems', serverParams],
      queryFn: () => fetchArtistItems(serverParams),
    }),
    queryClient.prefetchQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions }),
  ]);

  const artistInformationState = dehydrate(queryClient, {
    shouldDehydrateQuery: (q) => q.queryKey[0] === 'artistInformation',
  });
  const artistItemsState = dehydrate(queryClient, { shouldDehydrateQuery: (q) => q.queryKey[0] === 'artistItems' });
  const exhibitionsState = dehydrate(queryClient, { shouldDehydrateQuery: (q) => q.queryKey[0] === 'exhibitions' });

  return (
    <ClientArtistPage
      artistId={artistId}
      artistInformationState={artistInformationState}
      artistItemsState={artistItemsState}
      exhibitionsState={exhibitionsState}
      initialParams={initialParams}
    />
  );
}
