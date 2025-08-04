'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ExhibitionBackground from '@/components/features/exhibition/exhibition-background';
import ExhibitionDetail from '@/components/features/exhibition/exhibition-detail';
import ExhibitionItemList from '@/components/features/exhibition/exhibition-item-list';

interface ClientExhibitionPageProps {
  dehydratedState: DehydratedState;
  exhibitionId: number;
  frame: 'grid' | 'masonry';
}

export default function ClientExhibitionPage({ dehydratedState, exhibitionId, frame }: ClientExhibitionPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <ExhibitionBackground exhibitionId={exhibitionId} />
        <div className="mb-12">
          <ExhibitionDetail exhibitionId={exhibitionId} />
        </div>
        <ExhibitionItemList exhibitionId={exhibitionId} frame={frame} />
      </div>
    </HydrationBoundary>
  );
}
