'use client';

import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import MyProfile from '@/components/features/me/my-profile';

interface ClientMePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientMePage({ dehydratedState }: ClientMePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <MyProfile />
    </HydrationBoundary>
  );
}
