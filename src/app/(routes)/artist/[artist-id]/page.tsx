import { dehydrate } from '@tanstack/react-query';

import ClientArtistPage from '@/components/client/artist/page';
import { fetchArtist } from '@/services/api/artist-controller';
import { fetchExhibitions } from '@/services/api/exhibitions';
import { fetchItems } from '@/services/api/item-controller';
import { createQueryClient } from '@/services/query/server';
import type { ItemControllerParams, ItemControllerServerParams } from '@/types/item-controller';

export default async function ArtistPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{ 'artist-id': string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await paramsPromise;
  const raw = await searchParamsPromise;

  const artistId = Number(params['artist-id']);

  const initialParams: ItemControllerParams = {
    categoryId: Number(raw.categoryId) || 0,
    sort: raw.sort ? String(raw.sort) : 'price,desc',
    artistId: artistId,
    frame: raw.frame ? String(raw.frame) : 'grid',
  };

  const serverParams: ItemControllerServerParams = {
    ...(initialParams as Omit<ItemControllerParams, 'frame'>),
  };

  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['artist', artistId],
      queryFn: () => fetchArtist(artistId),
    }),
    queryClient.prefetchQuery({
      queryKey: ['items', serverParams],
      queryFn: () => fetchItems(serverParams),
    }),
    queryClient.prefetchQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientArtistPage dehydratedState={dehydratedState} artistId={artistId} initialParams={initialParams} />;
}
