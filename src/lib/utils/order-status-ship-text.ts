import { formatKoreanDateTime } from './date-format';

// 주문건 상태 계산
export const getOrderStatusText = (orderStatus: string, deliveryStatus: string): string => {
  if (orderStatus === 'WAITING_FOR_PAYMENT') return '입금확인중';
  if (orderStatus === 'CANCELLING') return '취소접수';
  if (orderStatus === 'CANCELLED') return '취소완료';

  if (orderStatus === 'PAID') {
    if (deliveryStatus === 'READY') return '배송준비중';
    if (deliveryStatus === 'SHIPPING') return '배송중';
    if (deliveryStatus === 'DELIVERED') return '배송완료';
  }

  return '기타';
};

// 배송 메시지 계산
export const getShipComment = (
  deliveryStatus: string,
  deliveryExpectedDate: string,
  deliveryCompletedDate: string,
): string => {
  const { month, day, weekday } = formatKoreanDateTime(
    deliveryStatus === 'SHIPPING' ? deliveryExpectedDate : deliveryCompletedDate,
  );
  if (deliveryStatus === 'SHIPPING') {
    return `${month}/${day} (${weekday}) 도착 예정`;
  }
  if (deliveryStatus === 'DELIVERED') {
    return `${month}/${day} (${weekday}) 도착 완료`;
  }
  return '';
};
