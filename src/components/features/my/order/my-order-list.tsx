'use client';

import { useRouter } from 'next/navigation';

import EmptyCardNoButton from '@/components/common/empty/empty-card-no-button';
import { formatKoreanDateTime } from '@/lib/utils/date-format';
import { getOrderStatusText, getShipComment } from '@/lib/utils/order-status-ship-text';
import GoIcon from '@/public/icons/layout/scroll-to-top.svg';
import { OrderResponseSchema } from '@/types/order-controller';

import MyOrderCard from './my-order-card';

interface MyOrderListProps {
  orders: OrderResponseSchema[];
}

export default function MyOrderList({ orders }: MyOrderListProps) {
  const router = useRouter();

  const isButton = false;

  const isMyOrdersEmpty = orders.length === 0;

  if (isMyOrdersEmpty) {
    return <EmptyCardNoButton text="주문 내역이 없습니다" />;
  } else {
    return (
      <>
        {orders.map((order, index) => {
          // 상태 텍스트 계산
          const statusText = getOrderStatusText(order.summary.orderStatus, order.delivery.deliveryStatus);
          const shipComment = getShipComment(
            order.delivery.deliveryStatus,
            order.delivery.deliveryExpectedDate,
            order.delivery.deliveryCompletedDate,
          );
          // 날짜 계산
          const { year, month, day } = formatKoreanDateTime(order.summary.orderDate);

          return (
            <>
              <div key={index} className="pt-5 pb-6">
                <div className="text-grey-9 text-body-02 flex items-center justify-between px-5 py-2 font-medium">
                  <span>
                    {String(year)}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => router.push(`/my/order?id=${order.summary.orderId}`)}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <span>주문 상세</span>
                    <GoIcon className="text-grey-5 rotate-90" />
                  </button>
                </div>
                <MyOrderCard
                  status={statusText}
                  shipComment={shipComment}
                  url={order.summary.itemThumbnail}
                  title={
                    order.items.length > 1
                      ? `${order.summary.itemName} 외 ${order.summary.totalQuantity - 1}건`
                      : order.summary.itemName
                  }
                  price={order.summary.totalAmount}
                  itemCount={order.summary.totalQuantity}
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
