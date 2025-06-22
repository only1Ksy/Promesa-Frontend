'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ItemList from '@/components/common/item/item-list';
import { SHOP_INTRODUCTION_LINE_LIST } from '@/lib/constants/business-information';
import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import type { ShopItemListParams } from '@/types/params.dto';

interface ClientShopPageProps {
  dehydratedState: DehydratedState;
  initialParams: ShopItemListParams;
}

export default function ClientShopPage({ dehydratedState, initialParams }: ClientShopPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <div
          id="not-z-index"
          className="fixed-component no-z-index bg-green top-11.5 flex h-105.5 items-end justify-center overflow-hidden"
        >
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-130/211 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]" />
          <div className="z-10 mb-12.5 flex flex-col gap-1.5">
            <p className="text-headline-03 text-center text-white">{SHOP_INTRODUCTION_LINE_LIST[0]}</p>
            <p className="text-body-02 text-grey-3 text-center font-medium">
              {stringToMultilineTSX(SHOP_INTRODUCTION_LINE_LIST[1])}
            </p>
          </div>
        </div>
        <div className="bg-pale-green z-5 mt-105.5 pt-7 pb-20">
          <ItemList initialParams={initialParams} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
