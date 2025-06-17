'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';

import chunkList from '@/lib/utils/chunk-list';
import pickItemListServerParams from '@/lib/utils/pick-item-list-server-params';
import { fetchShopItems } from '@/services/api/items';
import type { ItemListParams } from '@/types/params.dto';

import ItemListFilteringHeader from './item-list-filtering-header';
import ItemListPaginationFooter from './item-list-pagination-footer';
import ItemPreviewGrid from './item-preview-grid';
import ItemPreviewMasonry from './item-preview-masonry';

interface ItemListGridProps {
  initialParams: ItemListParams;
}

export default function ItemList({ initialParams }: ItemListGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params: ItemListParams = {
    categoryId: searchParams.get('categoryId') ?? initialParams.categoryId,
    sort: searchParams.get('sort') ?? initialParams.sort,
    page: searchParams.get('page') ?? initialParams.page,
    frame: searchParams.get('frame') ?? initialParams.frame,
  };

  const serverParams = pickItemListServerParams(params);

  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['shopItems', serverParams],
    queryFn: () => fetchShopItems(serverParams),
  });

  const items = queryData?.data || [];
  const totalPage = queryData?.meta.totalPage || 0;

  const push = (next: Partial<ItemListParams>) =>
    router.push(`?${new URLSearchParams({ ...params, ...next }).toString()}`);

  if (!items) notFound();

  if (isLoading) return null;

  return (
    <div className="mx-5 mt-7 mb-20 flex flex-col gap-20">
      {isFetching && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#000000]/40">
          <div id="loader" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {/* 필터링 헤더 */}
        <ItemListFilteringHeader categoryId={params.categoryId} sort={params.sort} frame={params.frame} push={push} />
        {/* 아이템 리스트 */}
        <div className="flex flex-col gap-4">
          {['grid', 'masonry'].includes(params.frame) &&
            chunkList(items, params.frame === 'grid' ? 2 : 3).map((group, idx) => {
              const ItemPreview = params.frame === 'grid' ? ItemPreviewGrid : ItemPreviewMasonry;

              const placeholders = Array(params.frame === 'grid' ? 2 : 3 - group.length).fill(null);

              return (
                <div key={`item-list-group-${params.frame}-${idx}`} className={`flex justify-between`}>
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
        </div>
      </div>
      {/* 페이지네이션 */}
      <ItemListPaginationFooter currentPage={Number(params.page)} totalPage={totalPage} push={push} />
    </div>
  );
}
