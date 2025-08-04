'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import EmptyCard from '@/components/common/empty/empty-card';
import useAlert from '@/hooks/use-alert';
import { usePostCartItem } from '@/hooks/use-cart';
import { useToggleWish } from '@/hooks/use-toggle-wish';
import { fetchWishList } from '@/services/api/wish-controller';

import WishListItem from './wish-list-item';
import WishListPaginationFooter from './wish-list-pagination-footer';

const PAGE_SIZE = 5;

export default function WishListWithPaginationComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedList, setSelectedList] = useState<boolean[]>(() => Array(PAGE_SIZE).fill(false));

  const { data } = useSuspenseQuery({ queryKey: ['itemWishList', 'ITEM'], queryFn: () => fetchWishList('ITEM') });

  const alertModal = useAlert();
  const { mutate: postCarts } = usePostCartItem();
  const { mutate: toggleWish } = useToggleWish();

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page'));
    return Number.isInteger(page) && page >= 0 ? page : 0;
  }, [searchParams]);

  const paginatedData = useMemo(() => {
    const startIdx = currentPage * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    return data.slice(startIdx, endIdx);
  }, [data, currentPage]);

  useEffect(() => {
    setSelectedList(Array(PAGE_SIZE).fill(false));
  }, [currentPage]);

  const push = (page: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', page.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  const select = (idx: number) => {
    setSelectedList((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  // 선택 작품 삭제
  const handleDeleteSelected = () => {
    paginatedData.forEach((item, idx) => {
      if (selectedList[idx]) {
        toggleWish({
          targetType: 'ITEM',
          targetId: item.targetId,
          currentWished: true,
        });
      }
    });

    setSelectedList(Array(PAGE_SIZE).fill(false));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    router.replace(`?${newSearchParams.toString()}`);
  };

  // 전체 삭제
  const handleDeleteAll = () => {
    paginatedData.forEach((item) =>
      toggleWish({
        targetType: 'ITEM',
        targetId: item.targetId,
        currentWished: true,
      }),
    );

    setSelectedList(Array(PAGE_SIZE).fill(false));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    router.replace(`?${newSearchParams.toString()}`);
  };

  // 장바구니 담기
  const handlePostCart = () => {
    paginatedData.map((item, idx) => {
      if (selectedList[idx]) {
        postCarts({ itemId: item.targetId, quantity: 1 });
      }
    });

    setSelectedList(Array(PAGE_SIZE).fill(false));
    const newSearchParams = new URLSearchParams(searchParams.toString());
    router.replace(`?${newSearchParams.toString()}`);

    alertModal({ message: '장바구니에 추가했습니다.' });
  };

  return data.length === 0 ? (
    <div className="relative flex min-h-[calc(100vh-var(--spacing)*11.5)]">
      <EmptyCard
        main="좋아요한 작품이 없습니다"
        sub="마음에 드는 작품의 하트를 눌러보세요"
        buttonText="하트 누르러 가기"
      />
    </div>
  ) : (
    <div className="mx-5 mt-5 mb-14.5 flex flex-col gap-10">
      <div className="flex flex-col gap-4.5">
        <div className="text-body-02 text-grey-6 flex justify-between font-medium">
          <button onClick={() => setSelectedList(Array(PAGE_SIZE).fill(true))} className="cursor-pointer">
            <p>전체선택</p>
          </button>
          <button onClick={handleDeleteAll} className="cursor-pointer">
            <p>모두 삭제</p>
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-7">
            {paginatedData.map((item, idx) => (
              <WishListItem key={item.targetId} item={item} isSelected={selectedList[idx]} select={() => select(idx)} />
            ))}
          </div>
          <div className="flex justify-between gap-2">
            <button onClick={handleDeleteSelected} className="flex-1 cursor-pointer">
              <div className="flex h-11 w-full items-center justify-center border border-[#000000]">
                <p className="text-body-02 text-grey-9 font-medium">선택 작품 삭제</p>
              </div>
            </button>
            <button onClick={handlePostCart} className="flex-1 cursor-pointer">
              <div className="flex h-11 w-full items-center justify-center bg-[#000000]">
                <p className="text-body-02 text-grey-0 font-medium">장바구니 담기</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <WishListPaginationFooter currentPage={currentPage} totalPages={Math.ceil(data.length / PAGE_SIZE)} push={push} />
    </div>
  );
}
