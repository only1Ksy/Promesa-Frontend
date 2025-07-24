'use client';

import MyOrderList from '@/components/features/my/order/my-order-list';
import MyOrderModal from '@/components/features/my/order/my-order-modal';

export default function ClientMyOrderPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}>
      <MyOrderList />
      <MyOrderModal />
    </div>
  );
}
