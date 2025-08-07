'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import MyOrderList from '@/components/features/my/order/my-order-list';
import MyOrderModal from '@/components/features/my/order/my-order-modal';
import { fetchOrders } from '@/services/api/order-controller';

interface ClientMyOrderPageProps {
  ordersState: DehydratedState;
}

export default function ClientMyOrderPage({ ordersState }: ClientMyOrderPageProps) {
  const { data: orders } = useSuspenseQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(),
    select: (res) => res,
  });

  if (!orders) return null;

  return (
    <HydrationBoundary state={ordersState}>
      <div style={{ minHeight: 'calc(100vh - 46px)' }}>
        <MyOrderList orders={orders} />
        <MyOrderModal />
      </div>
    </HydrationBoundary>
  );
}
