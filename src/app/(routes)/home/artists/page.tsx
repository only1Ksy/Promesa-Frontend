import { dehydrate } from '@tanstack/react-query';

import ClientHomeArtistsPage from '@/components/client/home-artists/page';
import { fetchArtistList } from '@/services/api/artist-controller';
import { createQueryClient } from '@/services/query/server';

export default function HomeArtistsPage() {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['artistList'], queryFn: fetchArtistList });

  const dehydratedState = dehydrate(queryClient);

  return <ClientHomeArtistsPage dehydratedState={dehydratedState} />;
}
