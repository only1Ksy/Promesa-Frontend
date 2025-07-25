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
  type: 'SINGLE' | 'MULTIPLE';
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
  };
  items: Array<{
    itemId: number;
    itemName: string;
    price: number;
    quantity: number;
  }>;
}

export interface OrderSummary {
  orderId: number;
  orderDate: string;
  orderStatus: 'WAITING_FOR_PAYMENT' | 'PAID' | 'CANCELLED' | string;
  totalAmount: number;
  totalQuantity: number;
  itemThumbnail: string;
  itemName: string;
  buyerName: string;
  buyerPhone: string;
  deliveryExpectedDate: string;
  deliveryStartDate: string;
  deliveryCompletedDate: string;
  deliveryStatus: 'READY' | 'SHIPPING' | 'DELIVERED' | string;
}

export type OrdersResponseSchema = OrderSummary[];
