'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import SearchedResult from '@/components/features/search/searched-result';

interface ClientSearchPageProps {
  dehydratedState: DehydratedState;
  keyword: string;
}

export default function ClientSearchPage({ dehydratedState, keyword }: ClientSearchPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchedResult keyword={keyword} />
    </HydrationBoundary>
  );
}
