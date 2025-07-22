'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ExhibitionList from '@/components/features/home/exhibitions/exhibition-list';
import HomeExhibitionsBackground from '@/components/features/home/exhibitions/home-exhibitions-background';
import type { ExhibitionSummarySchema } from '@/types/exhibition-controller';

interface ClientHomeExihibitionsPageProps {
  dehydratedState: DehydratedState;
  status: ExhibitionSummarySchema['status'] | 'ALL';
}

export default function ClientHomeExihibitionsPage({ dehydratedState, status }: ClientHomeExihibitionsPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeExhibitionsBackground />
      <ExhibitionList status={status} />
    </HydrationBoundary>
  );
}
