'use client';

import { useQuery } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';

import DeliveryForm from '@/components/features/order/delivery-form';
import OrderedProductList from '@/components/features/order/ordered-product-list';
import PayForm from '@/components/features/order/pay-form';
import { fetchItemDetail } from '@/services/api/item';

interface ClientOrderPageProps {
  itemId: number;
  itemDetailState: DehydratedState;
}

export default function ClientOrderItemPage({ itemId, itemDetailState }: ClientOrderPageProps) {
  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null;

  return (
    <HydrationBoundary state={itemDetailState}>
      <div className="flex flex-col gap-6.5">
        {/* 주문 아이템 리스트 */}
        <OrderedProductList items={item} />
        <h1>{item.itemName}</h1>
        <p>{item.price.toLocaleString()}원</p>
        {/* 배송지 작성 */}
        <DeliveryForm />
        {/* 결제 수단 */}
        <PayForm />
      </div>
    </HydrationBoundary>
  );
}
