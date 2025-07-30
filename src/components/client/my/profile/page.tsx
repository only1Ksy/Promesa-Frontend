'use client';

import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ProfileListWithBottomFixedBar from '@/components/features/my/profile/profile-list-with-bottom-fixed-bar';

interface ClientMyProfilePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientMyProfilePage({ dehydratedState }: ClientMyProfilePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfileListWithBottomFixedBar />
    </HydrationBoundary>
  );
}
