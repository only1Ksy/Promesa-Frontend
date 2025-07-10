'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ItemList from '@/components/common/item/item-list';
import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { SHOP_INTRODUCTION_LINE_LIST } from '@/lib/constants/business-information';
import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import type { ItemControllerParams } from '@/types/item-controller';

interface ClientShopPageProps {
  dehydratedState: DehydratedState;
  initialParams: ItemControllerParams;
}

export default function ClientShopPage({ dehydratedState, initialParams }: ClientShopPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        <div className="bg-green relative flex h-105.5 items-end justify-center overflow-hidden">
          <ImageWithLoading src="/images/shop-background.png" alt="프로메사 쇼핑 페이지의 배경 이미지." fill priority />
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-130/211 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]" />
          <div className="z-10 mb-12.5 flex flex-col gap-1.5">
            <p className="text-headline-03 text-center text-white">{SHOP_INTRODUCTION_LINE_LIST[0]}</p>
            <p className="text-body-02 text-grey-3 text-center font-medium">
              {stringToMultilineTSX(SHOP_INTRODUCTION_LINE_LIST[1])}
            </p>
          </div>
        </div>
        {/* 아이템 */}
        <ItemList initialParams={initialParams} page="SHOP" />
      </div>
    </HydrationBoundary>
  );
}
