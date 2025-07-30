import { dehydrate } from '@tanstack/react-query';

import ClientMyProfilePage from '@/components/client/my/profile/page';
import { fetchMe } from '@/services/api/member-controller';
import { createQueryClient } from '@/services/query/server';

export default async function MyProfilePage() {
  const queryClient = createQueryClient();

  queryClient.prefetchQuery({ queryKey: ['me'], queryFn: fetchMe });

  const dehydratedState = dehydrate(queryClient);

  return <ClientMyProfilePage dehydratedState={dehydratedState} />;
}
