import { dehydrate } from '@tanstack/react-query';

import ClientHomeExihibitionsPage from '@/components/client/home-exhibitions/page';
import { fetchExhibitions } from '@/services/api/exhibition-controller';
import { createQueryClient } from '@/services/query/server';

export default function HomeExhibitionsPage() {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['exhibitionList'], queryFn: fetchExhibitions });

  const dehydratedState = dehydrate(queryClient);

  return <ClientHomeExihibitionsPage dehydratedState={dehydratedState} />;
}
