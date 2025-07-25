'use client';

import CopyIcon from '@/public/icons/layout/copy.svg';
import { OrderResponseSchema } from '@/types/order-controller';

interface OrderInformationProps {
  order: OrderResponseSchema;
}

export default function OrderInformation({ order }: OrderInformationProps) {
  const copyClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  // 날짜 포매팅
  const date = new Date(order.deposit.depositDeadline);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let hour = date.getHours();

  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';

  if (!isAM && hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  // 은행 계좌 포매팅
  const [bankName, accountNumber] = order.deposit.bankName.split(' ');

  return (
    <div className="flex w-full flex-col items-end gap-2">
      <div className="bg-green flex w-full flex-col gap-4.75 rounded-sm p-7">
        {/* 위 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">주문 상품</span>
            <span className="text-body-02 font-medium">
              {order.summary.totalQuantity > 1
                ? `${order.items[0].itemName} 외 ${order.summary.totalQuantity - 1}건`
                : order.items[0].itemName}
            </span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-body-02 font-bold">배송지</span>
            <div className="flex flex-col text-right">
              <p className="text-body-02 font-medium">{order.delivery.address}</p>
              <p className="text-body-02 font-medium">{order.delivery.addressDetail}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">결제 금액</span>
            <span className="text-body-02 font-medium">{order.summary.totalAmount.toLocaleString()}원</span>
          </div>
        </div>
        <hr
          className="border-grey-4 w-full border-t-2"
          style={{
            borderStyle: 'dashed',
            borderWidth: '0.5px',
            borderImage: 'repeating-linear-gradient(to right, #9ca3af 0 3px, transparent 3px 6px) 100',
          }}
        />
        {/* 아래 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">은행명</span>
            <span className="text-body-02 font-bold">{bankName}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-body-02 font-bold">예금주</span>
            <span className="text-body-02 font-medium">{order.deposit.depositorName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">계좌번호</span>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={() => copyClipBoard(accountNumber)}>
                <CopyIcon width={16} height={16} />
              </button>
              <span className="text-body-02 font-medium">{accountNumber}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">입금 금액</span>
            <span className="text-body-02 font-medium">{order.summary.totalAmount}원</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">입금 기한</span>
            <span className="text-body-02 text-orange font-medium">
              {year}년 {month}월 {day}일 {ampm} {hour}시까지
            </span>
          </div>
        </div>
      </div>
      <p className="text-caption-01 text-grey-5 text-right font-medium">
        *입금 기한까지 입금하지 않으면 주문은 자동 취소됩니다.
      </p>
    </div>
  );
}
