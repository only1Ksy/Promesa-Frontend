import { dehydrate } from '@tanstack/react-query';

import ClientMePage from '@/components/client/me/page';
import { fetchMe } from '@/services/api/member-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MePage() {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({ queryKey: ['me'], queryFn: fetchMe });

  const dehydratedState = dehydrate(queryClient);

  return <ClientMePage dehydratedState={dehydratedState} />;
}
