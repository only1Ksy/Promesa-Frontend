'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/common/alert/toast-provider';
import Header from '@/components/layout/header';
import useAlert from '@/hooks/use-alert';
import { formatKoreanDateTime } from '@/lib/utils/date-format';
import { getItemStatusText, getOrderStatusText, getShipComment } from '@/lib/utils/order-status-ship-text';
import CopyIcon from '@/public/icons/layout/copy.svg';
import { cancelOrder } from '@/services/api/order-controller';
import { fetchDetailedOrder } from '@/services/api/order-controller';

import MyOrderCard from './my-order-card';

export default function MyOrderModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = Number(searchParams.get('id'));

  const { showToast } = useToast();
  const alertModal = useAlert();

  const { data: order, isLoading } = useQuery({
    enabled: !!orderId,
    queryKey: ['orderDetail', orderId],
    queryFn: () => fetchDetailedOrder(orderId),
    select: (res) => res,
  });

  const orderButtonClicked = () => {
    window.open('https://pf.kakao.com/_IucNn', '_blank');
  };

  if (!orderId || !order || isLoading) return null;

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

  const onCancelClicked = async () => {
    alertModal({
      message: '정말 취소하시겠습니까?',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          await cancelOrder(order.summary.orderId);
          showToast('주문을 취소했습니다.');
          router.push('/my/order');
        } catch (error) {
          console.error('취소 실패:', error);
          alertModal({ message: '주문 취소 중 오류가 발생했습니다. \n다시 시도해주세요.' });
        }
      },
    });
  };

  const isButton = true;
  const isCancelAvailable = order.summary.orderStatus === 'WAITING_FOR_PAYMENT';

  const paymentInformation = () => {
    if (order.summary.orderStatus === 'WAITING_FOR_PAYMENT') {
      return (
        <>
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
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="bg-pale-green hide-scrollbar fixed inset-0 z-999 mx-auto w-full max-w-[var(--frame-width)] overflow-y-auto shadow-lg"
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
          {order.items.map((item) => {
            const itemStatusText =
              item.itemStatus === null
                ? getOrderStatusText(order.summary.orderStatus, order.delivery.deliveryStatus)
                : getItemStatusText(item.itemStatus);
            const itemShipComment =
              item.itemStatus === null
                ? ''
                : getShipComment(
                    order.delivery.deliveryStatus,
                    order.delivery.deliveryExpectedDate,
                    order.delivery.deliveryCompletedDate,
                  );

            return (
              <MyOrderCard
                key={item.itemId}
                status={itemStatusText}
                shipComment={itemShipComment}
                url={item.orderItemThumbnail}
                title={item.itemName}
                price={item.price}
                itemCount={item.quantity}
                isButton={isButton}
                itemId={item.itemId}
              />
            );
          })}

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">구매자정보</span>
            <div className="text-body-01 flex flex-col gap-3 font-medium">
              <div className="flex items-center justify-between">
                <span>구매자</span>
                <span>{order.summary.buyerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>휴대전화</span>
                <span>{order.summary.buyerPhone ?? 'x'}</span>
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
                    {paymentInformation()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">배송지 정보</span>
            <div className="text-body-01 flex flex-col gap-3 font-medium">
              <div className="flex items-center justify-between">
                <span>받는 사람</span>
                <span>{order.delivery.receiverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>휴대전화</span>
                <span>{order.delivery.receiverPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>주소</span>
                <div className="flex flex-col items-end gap-0.5">
                  <span>{order.delivery.address}</span>
                  <span>{order.delivery.addressDetail}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {isCancelAvailable && (
              <div className="flex w-full justify-center px-2.5">
                <button
                  onClick={onCancelClicked}
                  className="text-body-02 bg-pale-green h-10.5 w-90.25 cursor-pointer border-[1.5px] font-medium text-black"
                >
                  취소하기
                </button>
              </div>
            )}
            <div className="flex w-full justify-center px-2.5 pb-7">
              <button
                onClick={orderButtonClicked}
                className="text-body-02 h-10.5 w-90.25 cursor-pointer bg-black font-medium text-white"
              >
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
