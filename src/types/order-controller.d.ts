export interface OrderItem {
  itemId: number;
  quantity: number;
}

export interface Address {
  recipientName: string;
  zipCode: string;
  addressMain: string;
  addressDetails: string;
  recipientPhone: string;
}

export interface Payment {
  paymentMethod: string; // 예: '무통장입금'
  bankName: string;
  depositorName: string;
}

export interface OrderRequestSchema {
  type: 'SINGLE' | 'CART';
  items: OrderItem[];
  address: Address;
  payment: Payment;
}

export interface OrderResponseSchema {
  summary: OrderSummary;
  deposit: {
    bankName: string;
    depositorName: string;
    depositDeadline: string;
  };
  delivery: {
    receiverName: string;
    receiverPhone: string;
    zipCode: string;
    address: string;
    addressDetail: string;
    deliveryFee: number;
    deliveryExpectedDate: string;
    deliveryStartDate: string;
    deliveryCompletedDate: string;
    deliveryStatus: 'READY' | 'SHIPPING' | 'DELIVERED' | string;
  };
  items: Array<{
    orderItemId: number;
    itemId: number;
    itemName: string;
    orderItemThumbnail: string;
    price: number;
    quantity: number;
    itemStatus:
      | 'CANCEL_REQUESTED'
      | 'CANCELLED'
      | 'RETURN_REQUESTED'
      | 'RETURNED'
      | 'EXCHANGE_REQUESTED'
      | 'EXCHANGED'
      | string;
  }>;
}

export interface OrderSummary {
  orderId: number;
  orderDate: string;
  orderStatus: 'WAITING_FOR_PAYMENT' | 'PAID' | 'CANCEL_NO_PAYMENT' | 'CANCEL' | string;
  totalAmount: number;
  totalQuantity: number;
  itemThumbnail: string;
  itemName: string;
  buyerName: string;
  buyerPhone: string;
}
