'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ItemList from '@/components/common/item/item-list';
import { SHOP_INTRODUCTION_LINE_LIST } from '@/lib/constants/business-information';
import type { ShopItemListParams } from '@/types/params.dto';

interface ClientShopPageProps {
  shopItemsState: DehydratedState;
  initialParams: ShopItemListParams;
}

export default function ClientShopPage({ shopItemsState, initialParams }: ClientShopPageProps) {
  return (
    <div className="mb-20 flex flex-col gap-7">
      <div className="bg-green relative flex h-105.5 w-full items-end justify-center overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-130/211 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]" />
        <div className="z-10 mb-12.5 flex flex-col gap-1.5">
          <p className="text-headline-03 text-center text-white">{SHOP_INTRODUCTION_LINE_LIST[0]}</p>
          <p className="text-body-02 text-grey-3 text-center font-medium">
            {SHOP_INTRODUCTION_LINE_LIST[1]}
            <br />
            {SHOP_INTRODUCTION_LINE_LIST[2]}
          </p>
        </div>
      </div>
      <HydrationBoundary state={shopItemsState}>
        <ItemList initialParams={initialParams} />
      </HydrationBoundary>
    </div>
  );
}
