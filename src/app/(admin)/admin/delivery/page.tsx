'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { editDelivery, fetchDeliveryByOrderId } from '@/services/api/admin/admin-delivery-controller';

export default function AdminDeliveryPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(editDelivery);
  console.log(fetchDeliveryByOrderId);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">배송 내역 조회/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
