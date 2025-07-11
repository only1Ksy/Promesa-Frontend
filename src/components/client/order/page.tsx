'use client';

// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';
import clsx from 'clsx';

import DeliveryForm from '@/components/features/order/delivery-form';
import OrderedProductList from '@/components/features/order/ordered-product-list';
import PayForm from '@/components/features/order/pay-form';
import TotalPrice from '@/components/features/order/total-price';
// import { fetchItemDetail } from '@/services/api/item';

interface ClientOrderPageProps {
  itemId: number;
  itemDetailState: DehydratedState;
}

export default function ClientOrderItemPage({ itemId, itemDetailState }: ClientOrderPageProps) {
  const [agree, setAgree] = useState<boolean>(false);

  /* const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null; */

  const item = {
    imageSrc: '/img/src',
    artistName: '김영은',
    itemName: '빈티지 블랙 높은잔 세트',
    itemNumber: 5,
    price: 135000,
    itemId: itemId,
  };

  const items = [item];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <HydrationBoundary state={itemDetailState}>
      <div className="flex flex-col gap-6.5 pb-21">
        {/* 주문 아이템 리스트 */}
        <OrderedProductList items={items} />
        {/* 배송지 작성 */}
        <DeliveryForm />
        {/* 결제 수단 */}
        <PayForm />
        {/* 총 결제 금액 */}
        <TotalPrice total={total} />
        {/* 결제 동의 버튼 */}
        <div className="flex h-12.5 items-center gap-4.5 px-5">
          <button type="button" onClick={() => setAgree((prev) => !prev)} className="flex items-center gap-1.5">
            <span className={clsx('h-3.5 w-3.5', agree ? 'bg-orange' : 'bg-grey-4')} />
            <span className={clsx('text-caption-01 font-medium', agree ? 'text-black' : 'text-grey-5')}>
              주문내용 확인 및 결제 동의
            </span>
          </button>
        </div>
      </div>
    </HydrationBoundary>
  );
}
