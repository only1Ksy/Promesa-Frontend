'use client';

import { useEffect, useRef } from 'react';
import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import SearchedResult from '@/components/features/search/searched-result';
import { useSearchKeywordStore } from '@/lib/store/use-search-keyword-store';

interface ClientSearchPageProps {
  dehydratedState: DehydratedState;
  keyword: string;
}

export default function ClientSearchPage({ dehydratedState, keyword }: ClientSearchPageProps) {
  const { setKeyword } = useSearchKeywordStore();
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!didInitRef.current) {
      setKeyword(keyword);
      didInitRef.current = true;
    }
  }, [keyword, didInitRef, setKeyword]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchedResult />
    </HydrationBoundary>
  );
}
