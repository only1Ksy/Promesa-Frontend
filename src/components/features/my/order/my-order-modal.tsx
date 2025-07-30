'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

import { useToast } from '@/components/common/alert/toast-provider';
import Header from '@/components/layout/header';
import { formatKoreanDateTime } from '@/lib/utils/date-format';
import { getOrderStatusText, getShipComment } from '@/lib/utils/order-status-ship-text';
import CopyIcon from '@/public/icons/layout/copy.svg';
import { fetchDetailedOrder } from '@/services/api/order-controller';

import MyOrderCard from './my-order-card';

export default function MyOrderModal() {
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get('id'));

  const { showToast } = useToast();

  const { data: order, isLoading } = useQuery({
    enabled: !!orderId,
    queryKey: ['orderDetail', orderId],
    queryFn: () => fetchDetailedOrder(orderId),
    select: (res) => res,
  });

  if (!orderId || !order || isLoading) return null;

  const statusText = getOrderStatusText(order.summary.orderStatus, order.summary.deliveryStatus);
  const shipComment = getShipComment(
    order.summary.deliveryStatus,
    order.summary.deliveryExpectedDate,
    order.summary.deliveryCompletedDate,
  );

  // 날짜 계산
  const { year, month, day } = formatKoreanDateTime(order.summary.orderDate);
  const {
    year: depositYear,
    month: depositMonth,
    day: depositDay,
    ampm: depositAmpm,
    hour: depositHour,
  } = formatKoreanDateTime(order.deposit.depositDeadline);

  // 계좌 포매팅
  const [bankName, accountNumber] = order.deposit.bankName.split(' ');

  const copyClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showToast('클립보드에 복사되었습니다.');
    console.log('copy');
  };

  const isButton = true;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="bg-pale-green fixed inset-0 z-999 mx-auto w-full max-w-[var(--frame-width)] overflow-y-auto shadow-lg"
    >
      <Header />
      <div className="flex flex-col gap-3 pt-11.5">
        <div className="flex items-center gap-2.5 px-5 pt-5">
          <span className="text-headline-05">주문상품정보</span>
          <span className="text-body-01 text-grey-5 font-medium">
            {String(year)}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')}
          </span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <MyOrderCard
            status={statusText}
            shipComment={shipComment}
            url={order.summary.itemThumbnail}
            title={
              order.items.length > 1
                ? `${order.items[0].itemName} 외 ${order.items.length - 1}건`
                : order.items[0].itemName
            }
            price={order.items[0].price}
            itemCount={order.items[0].quantity}
            isButton={isButton}
          />

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">구매자정보</span>
            <div className="text-body-01 flex flex-col gap-3 font-medium">
              <div className="flex items-center justify-between">
                <span>구매자</span>
                <span>{order.delivery.receiverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>휴대전화</span>
                <span>{order.delivery.receiverPhone}</span>
              </div>
            </div>
          </div>

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">결제정보</span>
            <div className="flex flex-col gap-3">
              <div className="text-subhead flex items-center justify-between">
                <span className="font-medium">총 결제 금액</span>
                <span className="text-orange font-bold">
                  {(order.summary.totalAmount + order.delivery.deliveryFee).toLocaleString()}원
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span>총 상품 금액</span>
                  <span>{order.summary.totalAmount.toLocaleString()}원</span>
                </div>
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <span>배송비</span>
                    <span>+{order.delivery.deliveryFee.toLocaleString()}원</span>
                  </div>
                  <div className="text-grey-6 text-caption-01 flex flex-col gap-2.5 font-medium">
                    <span className="flex items-center gap-0.5">
                      입금통장: {`${bankName} ${accountNumber}`}
                      <button className="cursor-pointer" onClick={() => copyClipBoard(accountNumber)}>
                        <CopyIcon width={16} height={16} />
                      </button>
                    </span>
                    <span>
                      입금기한:
                      {` ${depositYear}년 ${depositMonth}월 ${depositDay}일 ${depositAmpm} ${depositHour}시까지`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
