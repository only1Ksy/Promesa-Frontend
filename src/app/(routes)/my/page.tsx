import { dehydrate } from '@tanstack/react-query';

import ClientMyPage from '@/components/client/my/page';
import { fetchMe } from '@/services/api/member-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MyPage() {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery({ queryKey: ['me'], queryFn: fetchMe });

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyPage dehydratedState={dehydratedState} />;
}
