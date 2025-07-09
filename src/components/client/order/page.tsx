'use client';

import { useQuery } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';

import DeliveryForm from '@/components/features/order/delivery-form';
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
      {/* 배송지 작성 */}
      <DeliveryForm />
      {/* 주문 페이지 UI 구성 */}

      <h1>{item.itemName}</h1>
      <p>{item.price.toLocaleString()}원</p>
    </HydrationBoundary>
  );
}
