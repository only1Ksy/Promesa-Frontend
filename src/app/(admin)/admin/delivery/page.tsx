'use client';

import { useState } from 'react';

import { editDelivery, fetchDeliveryByOrderId } from '@/services/api/admin/admin-delivery-controller';
import type { AdminDelivery } from '@/types/admin/admin-delivery-controller';

export default function AdminDeliveryEditPage() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [delivery, setDelivery] = useState<AdminDelivery | null>(null);
  const [deliveryId, setDeliveryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 배송 정보 불러오기
  const handleFetch = async () => {
    if (!orderIdInput.trim()) return alert('주문 ID를 입력해주세요.');
    const parsedId = Number(orderIdInput);
    if (isNaN(parsedId)) return alert('숫자만 입력 가능합니다.');
    try {
      const data = await fetchDeliveryByOrderId(parsedId);
      setDelivery(data);
      setDeliveryId(data.deliveryId ?? null);
    } catch (err) {
      console.error(err);
      alert('배송 정보를 불러올 수 없습니다.');
      setDelivery(null);
    }
  };

  // 폼 값 변경 핸들러
  const handleChange = (field: keyof AdminDelivery, value: string | number) => {
    if (!delivery) return;
    setDelivery({ ...delivery, [field]: value });
  };

  // 저장
  const handleSubmit = async () => {
    if (!delivery || !deliveryId) return;
    setIsSubmitting(true);
    try {
      const {
        courierName,
        receiverName,
        receiverPhone,
        zipCode,
        address,
        addressDetail,
        deliveryStatus,
        deliveryExpectedDate,
        deliveryStartDate,
        deliveryCompletedDate,
        deliveryFee,
      } = delivery;

      const payload = {
        courierName,
        receiverName,
        receiverPhone,
        zipCode,
        address,
        addressDetail,
        deliveryStatus,
        deliveryExpectedDate,
        deliveryStartDate,
        deliveryCompletedDate,
        deliveryFee,
      };

      await editDelivery(deliveryId, payload);
      alert('배송 정보가 수정되었습니다.');
    } catch (err) {
      console.error('수정 실패', err);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">🚚 관리자 배송 정보 관리</h1>

      {/* 주문 ID 입력 */}
      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          value={orderIdInput}
          onChange={(e) => setOrderIdInput(e.target.value)}
          placeholder="배송 정보를 조회 | 수정할 주문 ID를 입력하세요"
          className="flex-1 rounded border p-2"
        />
        <button onClick={handleFetch} className="bg-orange cursor-pointer rounded px-4 py-2 text-white">
          조회
        </button>
      </div>

      {/* 배송 정보 폼 */}
      {delivery && (
        <>
          <div className="space-y-4">
            {[
              ['배송 상태', 'deliveryStatus'],
              ['택배사 이름', 'courierName'],
              ['수령인 이름', 'receiverName'],
              ['수령인 연락처', 'receiverPhone'],
              ['우편번호', 'zipCode'],
              ['주소', 'address'],
              ['상세 주소', 'addressDetail'],
              ['예상 배송일', 'deliveryExpectedDate'],
              ['배송 시작일', 'deliveryStartDate'],
              ['배송 완료일', 'deliveryCompletedDate'],
              ['배송비', 'deliveryFee'],
            ].map(([label, field]) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 font-medium">{label}</label>

                {/* 배송 상태는 select로 */}
                {field === 'deliveryStatus' ? (
                  <select
                    value={delivery.deliveryStatus}
                    onChange={(e) => handleChange('deliveryStatus', e.target.value)}
                    className="rounded border p-2"
                  >
                    <option value="READY">배송 준비 중</option>
                    <option value="SHIPPING">배송 중</option>
                    <option value="DELIVERED">배송 완료</option>
                  </select>
                ) : (
                  <input
                    type={field.includes('Date') ? 'date' : field === 'deliveryFee' ? 'number' : 'text'}
                    value={delivery[field as keyof AdminDelivery] ?? ''}
                    onChange={(e) =>
                      handleChange(
                        field as keyof AdminDelivery,
                        field === 'deliveryFee' ? Number(e.target.value) : e.target.value,
                      )
                    }
                    className="rounded border p-2"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-6 cursor-pointer rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {isSubmitting ? '수정 중...' : '배송 정보 저장'}
          </button>
        </>
      )}
    </div>
  );
}
