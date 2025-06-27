import { dehydrate } from '@tanstack/react-query';

import ClientHomePage from '@/components/client/home/page';
import { fetchExhibitions } from '@/services/api/exhibitions';
import { fetchBrandInfo } from '@/services/api/home-controller';
import { fetchNowPopularItems } from '@/services/api/item-controller';
import { createQueryClient } from '@/services/query/server';

export default async function HomePage() {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['brandInfo'], queryFn: fetchBrandInfo }),
    // mock API
    queryClient.prefetchQuery({ queryKey: ['exhibitions'], queryFn: fetchExhibitions }),
    queryClient.prefetchQuery({ queryKey: ['nowPopularItems'], queryFn: fetchNowPopularItems }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return <ClientHomePage dehydratedState={dehydratedState} />;
}
