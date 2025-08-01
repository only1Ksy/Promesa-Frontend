'use client';

import { useRouter } from 'next/navigation';

import { formatKoreanDateTime } from '@/lib/utils/date-format';
import { getOrderStatusText, getShipComment } from '@/lib/utils/order-status-ship-text';
import GoIcon from '@/public/icons/layout/scroll-to-top.svg';
import { OrderSummary } from '@/types/order-controller';

import MyOrderCard from './my-order-card';

interface MyOrderListProps {
  orders: OrderSummary[];
}

export default function MyOrderList({ orders }: MyOrderListProps) {
  const router = useRouter();

  const isButton = false;

  const isMyOrdersEmpty = orders.length === 0;

  if (isMyOrdersEmpty) {
    return (
      <p className="text-grey-6 text-body-01 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        작성 가능한 리뷰가 없어요
      </p>
    );
  } else {
    return (
      <>
        {orders.map((order, index) => {
          // 상태 텍스트 계산
          const statusText = getOrderStatusText(order.orderStatus, order.deliveryStatus);
          const shipComment = getShipComment(
            order.deliveryStatus,
            order.deliveryExpectedDate,
            order.deliveryCompletedDate,
          );
          // 날짜 계산
          const { year, month, day } = formatKoreanDateTime(order.orderDate);

          return (
            <>
              <div key={index} className="pt-5 pb-6">
                <div className="text-grey-9 text-body-02 flex items-center justify-between px-5 py-2 font-medium">
                  <span>
                    {String(year)}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => router.push(`/my/order?id=${order.orderId}`)}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <span>주문 상세</span>
                    <GoIcon className="text-grey-5 rotate-90" />
                  </button>
                </div>
                <MyOrderCard
                  status={statusText}
                  shipComment={shipComment}
                  url={order.itemThumbnail}
                  title={order.totalQuantity > 1 ? `${order.itemName} 외 ${order.totalQuantity - 1}건` : order.itemName}
                  price={order.totalAmount}
                  itemCount={order.totalQuantity}
                  isButton={isButton}
                />
              </div>
              {index !== orders.length - 1 && <div className="bg-green mx-5 h-[1px]" />}
            </>
          );
        })}
      </>
    );
  }
}
