'use client';

import { useCallback } from 'react';
import { useEffect, useState } from 'react';

import {
  fetchAdminOrders,
  updateOrderItemStatus,
  updateOrderStatus,
} from '@/services/api/admin/admin-order-controller';
import type { AdminOrderResponse } from '@/types/admin/admin-order-controller';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<AdminOrderResponse>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('');
  const [itemStatusFilter, setItemStatusFilter] = useState<string>('');

  // 상태 변경용 map
  const [itemStatusMap, setItemStatusMap] = useState<Record<number, string>>({});
  const [orderStatusMap, setOrderStatusMap] = useState<Record<number, string>>({});

  // 주문 목록 조회
  const loadOrders = useCallback(async () => {
    try {
      const data = await fetchAdminOrders({
        orderStatus: orderStatusFilter || undefined,
        itemStatus: itemStatusFilter || undefined,
      });
      setOrders(data);
    } catch (e) {
      console.error('주문 조회 실패:', e);
    }
  }, [orderStatusFilter, itemStatusFilter]);

  // 상태 동기화
  useEffect(() => {
    loadOrders();
  }, [orderStatusFilter, itemStatusFilter, loadOrders]);

  // 상태 맵 초기화
  useEffect(() => {
    const newItemStatusMap: Record<number, string> = {};
    const newOrderStatusMap: Record<number, string> = {};

    orders.forEach((order) => {
      newOrderStatusMap[order.summary.orderId] = order.summary.orderStatus;
      order.items.forEach((item) => {
        newItemStatusMap[item.orderItemId] = item.itemStatus;
      });
    });

    setOrderStatusMap(newOrderStatusMap);
    setItemStatusMap(newItemStatusMap);
  }, [orders]);

  // 주문 상태 변경
  const handleOrderStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, { orderStatus: newStatus });
      alert('주문 상태가 변경되었습니다.');
      loadOrders();
    } catch (e) {
      console.error(e);
    }
  };

  // 주문 아이템 상태 변경
  const handleItemStatusChange = async (orderItemId: number, newStatus: string) => {
    try {
      await updateOrderItemStatus(orderItemId, { orderItemStatus: newStatus });
      alert('아이템 상태가 변경되었습니다.');
      loadOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">🧾 관리자 주문 관리</h1>

      {/* 필터 */}
      <div className="mb-6 flex gap-4">
        <select
          value={orderStatusFilter}
          onChange={(e) => setOrderStatusFilter(e.target.value)}
          className="rounded border p-2"
        >
          <option value="">전체 주문 상태</option>
          <option value="WAITING_FOR_PAYMENT">결제 대기</option>
          <option value="PAID">결제 완료</option>
          <option value="CANCEL">주문 후 취소</option>
          <option value="CANCEL_NO_PAYMENT">미결제 취소</option>
        </select>

        <select
          value={itemStatusFilter}
          onChange={(e) => setItemStatusFilter(e.target.value)}
          className="rounded border p-2"
        >
          <option value="">전체 아이템 상태</option>
          <option value="CANCEL_REQUESTED">취소 요청</option>
          <option value="CANCELLED">취소 완료</option>
          <option value="RETURN_REQUESTED">반품 요청</option>
          <option value="RETURNED">반품 완료</option>
          <option value="EXCHANGE_REQUESTED">교환 요청</option>
          <option value="EXCHANGED">교환 완료</option>
        </select>
      </div>

      {/* 주문 목록 */}
      {orders.length === 0 ? (
        <p>주문이 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.summary.orderId} className="rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex justify-between">
                <div>
                  <p className="font-semibold">📦 주문번호: {order.summary.orderId}</p>
                  <p>상태: {order.summary.orderStatus}</p>
                  <p>총 금액: {order.summary.totalAmount.toLocaleString()}원</p>
                  <p>
                    구매자: {order.summary.buyerName} ({order.summary.buyerPhone ?? 'X'})
                  </p>
                </div>

                {/* 주문 상태 변경 */}
                <div className="flex items-center gap-2">
                  <select
                    value={orderStatusMap[order.summary.orderId] || ''}
                    onChange={(e) =>
                      setOrderStatusMap((prev) => ({
                        ...prev,
                        [order.summary.orderId]: e.target.value,
                      }))
                    }
                    className="rounded border p-1"
                  >
                    <option value="WAITING_FOR_PAYMENT">결제 대기</option>
                    <option value="PAID">결제 완료</option>
                    <option value="CANCEL">주문 후 취소</option>
                    <option value="CANCEL_NO_PAYMENT">미결제 취소</option>
                  </select>

                  <button
                    disabled={orderStatusMap[order.summary.orderId] === order.summary.orderStatus}
                    onClick={() =>
                      handleOrderStatusChange(order.summary.orderId, orderStatusMap[order.summary.orderId])
                    }
                    className="rounded bg-black px-3 py-1 text-white disabled:opacity-40"
                  >
                    변경
                  </button>
                </div>
              </div>

              {/* 아이템 목록 */}
              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.orderItemId} className="flex items-center justify-between border-t pt-2">
                    <div>
                      <p>{item.itemName}</p>
                      <p>수량: {item.quantity}</p>
                      <p>가격: {item.price.toLocaleString()}원</p>
                      <p>상태: {item.itemStatus}</p>
                    </div>

                    {/* 아이템 상태 변경 */}
                    <div className="flex items-center gap-2">
                      <select
                        value={itemStatusMap[item.orderItemId] || ''}
                        onChange={(e) =>
                          setItemStatusMap((prev) => ({
                            ...prev,
                            [item.orderItemId]: e.target.value,
                          }))
                        }
                        className="rounded border p-1"
                      >
                        <option value="">기본값</option>
                        <option value="CANCEL_REQUESTED">취소 요청</option>
                        <option value="CANCELLED">취소 완료</option>
                        <option value="RETURN_REQUESTED">반품 요청</option>
                        <option value="RETURNED">반품 완료</option>
                        <option value="EXCHANGE_REQUESTED">교환 요청</option>
                        <option value="EXCHANGED">교환 완료</option>
                      </select>

                      <button
                        disabled={itemStatusMap[item.orderItemId] === item.itemStatus}
                        onClick={() => handleItemStatusChange(item.orderItemId, itemStatusMap[item.orderItemId])}
                        className="rounded bg-black px-3 py-1 text-white disabled:opacity-40"
                      >
                        변경
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
