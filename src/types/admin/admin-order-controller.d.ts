import { OrderResponseSchema } from '../order-controller';

export interface AdminOrderRequest {
  orderStatus: 'WAITING_FOR_PAYMENT' | 'PAID' | 'CANCEL_NO_PAYMENT' | 'CANCEL' | string;
}

export interface AdminOrderItemRequest {
  orderItemStatus:
    | 'ORDERED'
    | 'CANCEL_REQUESTED'
    | 'CANCELLED'
    | 'RETURN_REQUESTED'
    | 'RETURNED'
    | 'EXCHANGE_REQUESTED'
    | 'EXCHANGED'
    | string;
}

export type AdminOrderResponse = OrderResponseSchema[];
