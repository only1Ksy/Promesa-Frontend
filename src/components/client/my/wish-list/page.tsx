'use client';

import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import WishListWithPaginationComponent from '@/components/features/my/wish-list/wish-list-with-pagination-component';

interface ClientMyWishListPagePros {
  dehydratedState: DehydratedState;
}

export default function ClientMyWishListPage({ dehydratedState }: ClientMyWishListPagePros) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <WishListWithPaginationComponent />
    </HydrationBoundary>
  );
}
