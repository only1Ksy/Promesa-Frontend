'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import SortedArtistList from '@/components/features/home/artists/sorted-artist-list';

interface ClientHomeArtistsPageProps {
  dehydratedState: DehydratedState;
}

export default function ClientHomeArtistsPage({ dehydratedState }: ClientHomeArtistsPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <SortedArtistList />
    </HydrationBoundary>
  );
}
