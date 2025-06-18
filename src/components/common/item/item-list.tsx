'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import chunkList from '@/lib/utils/chunk-list';
import pickItemListServerParams, { isArtistParams } from '@/lib/utils/pick-item-list-server-params';
import { fetchShopItems } from '@/services/api/items';
import type { ArtistItemListParams, ShopItemListParams } from '@/types/params.dto';

import ItemListFilteringHeader from './item-list-filtering-header';
import ItemListPaginationFooter from './item-list-pagination-footer';
import ItemPreviewGrid from './item-preview-grid';
import ItemPreviewMasonry from './item-preview-masonry';

interface ItemListGridProps {
  initialParams: ShopItemListParams | ArtistItemListParams;
}

export default function ItemList({ initialParams }: ItemListGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const params = {
    categoryId: searchParams.get('categoryId') ?? initialParams.categoryId,
    sort: searchParams.get('sort') ?? initialParams.sort,
    frame: searchParams.get('frame') ?? initialParams.frame,
    ...(isArtistParams(initialParams)
      ? { artistId: initialParams.artistId }
      : { page: searchParams.get('page') ?? initialParams.page }),
  } as ShopItemListParams | ArtistItemListParams;

  const serverParams = pickItemListServerParams(params);

  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [isArtistParams(initialParams) ? 'artistItems' : 'shopItems', serverParams],
    queryFn: () => fetchShopItems(serverParams),
  });

  const items = queryData?.data || [];
  const totalPage = queryData?.meta?.totalPage || 0;

  const push = (next: Partial<ShopItemListParams & ArtistItemListParams>) => {
    const merged = { ...params, ...next };
    delete (merged as Partial<ArtistItemListParams>).artistId; // artistId -> URL

    router.push(`?${new URLSearchParams(merged).toString()}`, { scroll: false });
  };

  if (!items) notFound();

  if (isLoading) return null;

  return (
    <div className="mx-5 flex flex-col gap-20">
      {isFetching && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#000000]/40">
          <div id="loader" />
        </div>
      )}
      <div className="relative flex flex-col gap-4">
        {/* 필터링 헤더 */}
        <ItemListFilteringHeader categoryId={params.categoryId} sort={params.sort} frame={params.frame} push={push} />
        {/* 아이템 리스트 */}
        <div
          className={`flex flex-col gap-4 ${!open && items.length >= 10 && (params.frame === 'grid' ? 'h-421 overflow-hidden' : params.frame === 'masonry' ? 'h-261 overflow-hidden' : '')}`}
        >
          {['grid', 'masonry'].includes(params.frame) &&
            chunkList(items, params.frame === 'grid' ? 2 : 3).map((group, idx) => {
              const ItemPreview = params.frame === 'grid' ? ItemPreviewGrid : ItemPreviewMasonry;
              const placeholders = Array((params.frame === 'grid' ? 2 : 3) - group.length).fill(null);

              return (
                <div
                  key={`item-list-group-${params.frame}-${idx}`}
                  className={`flex w-full ${params.frame === 'grid' ? 'gap-2.5' : 'gap-2'}`}
                >
                  {group.map((item) => (
                    <ItemPreview
                      key={`item-${item.itemId}`}
                      itemId={item.itemId}
                      itemName={item.itemName}
                      price={item.price}
                      artistName={item.artistName}
                      sale={item.sale}
                    />
                  ))}
                  {placeholders.map((_, idx) => (
                    <ItemPreview key={`placeholder-${idx}`} itemId={-1} itemName="" price={0} artistName="" sale={0} />
                  ))}
                </div>
              );
            })}
          {!open && items.length >= 10 && (
            <>
              <div className="from-pale-green/0 to-pale-green/80 absolute bottom-0 z-5 h-70 w-full bg-gradient-to-b from-8% to-100%" />
              <div className="absolute bottom-0 z-10 flex w-full justify-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-pale-green border-grey-7 cursor-pointer rounded-full border px-5 py-2"
                >
                  <span className="text-body-01 text-grey-7 font-medium">목록 열기</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {/* 페이지네이션 */}
      {!isArtistParams(initialParams) && (
        <ItemListPaginationFooter
          currentPage={Number((params as ShopItemListParams).page)}
          totalPage={totalPage}
          push={push}
        />
      )}
    </div>
  );
}
