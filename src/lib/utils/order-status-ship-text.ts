import { formatKoreanDateTime } from './date-format';

// 주문 상태 텍스트 반환
export const getOrderStatusText = (orderStatus: string, deliveryStatus: string): string => {
  switch (orderStatus) {
    case 'WAITING_FOR_PAYMENT':
      return '입금확인중';
    case 'PAID':
      if (deliveryStatus === 'READY') return '배송준비중';
      if (deliveryStatus === 'SHIPPED') return '배송중';
      if (deliveryStatus === 'DELIVERED') return '배송완료';
      if (deliveryStatus === 'RETURNING') return '반품처리중';
      if (deliveryStatus === 'EXCHANGING') return '교환처리중';
      if (deliveryStatus === 'RETURNED') return '반품완료';
      if (deliveryStatus === 'EXCHANGED') return '교환완료';
      return '결제완료';
    case 'SHIPPING':
      return '배송중';
    case 'DELIVERED':
      return '배송완료';
    case 'CANCEL_REQUESTED':
      return '취소접수';
    case 'CANCELLED':
    case 'CANCEL':
      return '취소완료';
    case 'RETURN_REQUESTED':
      return '반품접수';
    case 'RETURNED':
      return '반품완료';
    case 'EXCHANGE_REQUESTED':
      return '교환접수';
    case 'EXCHANGED':
      return '교환완료';
    case 'CANCEL_BEFORE_PAYMENT':
    case 'CANCEL_NO_PAYMENT':
      return '미입금취소';
    default:
      return '기타';
  }
};

// 배송 상태 기반 메시지
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

export const getItemStatusText = (itemStatus: string): string => {
  switch (itemStatus) {
    case 'CANCEL_REQUESTED':
      return '취소접수';
    case 'CANCELLED':
      return '취소완료';
    case 'RETURN_REQUESTED':
      return '반품접수';
    case 'RETURNED':
      return '반품완료';
    case 'EXCHANGE_REQUESTED':
      return '교환접수';
    case 'EXCHANGED':
      return '교환완료';
    default:
      return '기타';
  }
};
