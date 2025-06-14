import { dehydrate } from '@tanstack/react-query';

import ClientHomePage from '@/components/features/home/client/client-home-page';
import { fetchExhibitions } from '@/services/api/exhibitions';
import { fetchNowPopularItems, fetchThumbnailItems } from '@/services/api/items';
import { createQueryClient } from '@/services/query/server';

export default async function HomePage() {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions }),
    queryClient.prefetchQuery({ queryKey: ['thumbnailItems'], queryFn: fetchThumbnailItems }),
    queryClient.prefetchQuery({ queryKey: ['nowPopularItems'], queryFn: fetchNowPopularItems }),
  ]);

  const exhibitionsState = dehydrate(queryClient, { shouldDehydrateQuery: (q) => q.queryKey[0] === 'exhibitions' });
  const thumbnailItemsState = dehydrate(queryClient, {
    shouldDehydrateQuery: (q) => q.queryKey[0] === 'thumbnailItems',
  });
  const nowPopularItemsState = dehydrate(queryClient, {
    shouldDehydrateQuery: (q) => q.queryKey[0] === 'nowPopularItems',
  });

  return (
    <ClientHomePage
      exhibitionsState={exhibitionsState}
      thumbnailItemsState={thumbnailItemsState}
      nowPopularItemsState={nowPopularItemsState}
    />
  );
}
