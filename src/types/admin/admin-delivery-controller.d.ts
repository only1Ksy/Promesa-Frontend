export interface AdminDelivery {
  deliveryId?: number;
  courierName: string;
  receiverName: string;
  receiverPhone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  deliveryStatus: 'READY' | 'SHIPPING' | 'DELIVERED' | string;
  deliveryExpectedDate: string;
  deliveryStartDate: string;
  deliveryCompletedDate: string;
  deliveryFee: number;
  orderId?: number;
}
