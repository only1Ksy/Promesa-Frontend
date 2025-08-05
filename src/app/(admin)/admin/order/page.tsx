'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  fetchAdminOrders,
  updateOrderItemStatus,
  updateOrderStatus,
} from '@/services/api/admin/admin-order-controller';

export default function AdminOrderPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(fetchAdminOrders);
  console.log(updateOrderItemStatus);
  console.log(updateOrderStatus);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">주문 상태 조회/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
