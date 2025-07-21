'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ExhibitionList from '@/components/features/home/exhibitions/exhibition-list';
import HomeExhibitionsBackground from '@/components/features/home/exhibitions/home-exhibitions-background';

interface ClientHomeExihibitionsPageProps {
  dehydratedState: DehydratedState;
}

export default function ClientHomeExihibitionsPage({ dehydratedState }: ClientHomeExihibitionsPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeExhibitionsBackground />
      <ExhibitionList />
    </HydrationBoundary>
  );
}
