'use client';

import clsx from 'clsx';

import { useOrderStore } from '@/lib/store/order-information-store';

// import { fetchDefaultAddress } from '@/services/api/address-controller';
import OrderDropdown from './order-dropdown';

export default function DeliveryForm() {
  const delivery = useOrderStore((state) => state.delivery);
  const updateDelivery = useOrderStore((state) => state.updateDelivery);

  // const defaultAddress = fetchDefaultAddress();

  const openAddressSearch = () => {
    if (typeof window === 'undefined' || !window.daum?.Postcode) return;

    new window.daum.Postcode({
      oncomplete: (data) => {
        updateDelivery('postcode', data.zonecode);
        updateDelivery('address', data.address);
      },
    }).open();
  };

  const handleSelect = (value: string) => {
    updateDelivery('phone1', value);
  };

  const phoneList = [
    { label: '010', value: '010' },
    { label: '02', value: '02' },
    { label: '031', value: '031' },
  ];

  return (
    <section className="border-green flex flex-col gap-3.5 border-b px-5 pb-6.5">
      <div className="text-headline-05 font-bold">배송지</div>
      <div className="flex flex-col gap-6">
        {/* 최근 배송지 / 새로운 배송지 선택 */}
        <div className="flex items-center gap-3.5">
          {[
            { key: 'recent', label: '기본 배송지' },
            { key: 'new', label: '새로운 배송지' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => updateDelivery('deliveryType', key)}
              className="flex items-center gap-1.5"
            >
              <span className={clsx('h-3.5 w-3.5', delivery.deliveryType === key ? 'bg-orange' : 'bg-grey-4')} />
              <span
                className={clsx(
                  'text-caption-01 font-medium',
                  delivery.deliveryType === key ? 'text-black' : 'text-grey-5',
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="text-body-02 flex flex-col gap-2.5 font-medium">
          {/* 이름 */}
          <div className="flex flex-col">
            <input
              type="text"
              value={delivery.name}
              onChange={(e) => updateDelivery('name', e.target.value)}
              className="border-deep-green rounded-md border p-2.5 outline-none"
              placeholder="이름"
            />
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <input
                type="text"
                value={delivery.postcode}
                placeholder="우편번호"
                readOnly
                className="bg-green w-58.75 rounded-md p-2.5 outline-none"
              />
              <button
                onClick={openAddressSearch}
                type="button"
                className="text-body-02 font-regular w-29 cursor-pointer rounded-md bg-black px-4 py-2 text-white"
              >
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              value={delivery.address}
              readOnly
              placeholder="기본주소"
              className="border-deep-green rounded-md border p-2.5 outline-none"
            />
            <input
              type="text"
              value={delivery.addressDetail}
              onChange={(e) => updateDelivery('addressDetail', e.target.value)}
              placeholder="상세주소 (건물명, 호수 등)"
              className="border-deep-green rounded-md border p-2.5 outline-none"
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.75">
              <OrderDropdown items={phoneList} onSelect={handleSelect} width="w-64" />
              -
              <input
                type="text"
                maxLength={4}
                value={delivery.phone2}
                onChange={(e) => updateDelivery('phone2', e.target.value)}
                className="border-deep-green w-27 rounded-md border p-2.5 outline-none"
                placeholder="1234"
              />
              -
              <input
                type="text"
                maxLength={4}
                value={delivery.phone3}
                onChange={(e) => updateDelivery('phone3', e.target.value)}
                className="border-deep-green w-27 rounded-md border p-2.5 outline-none"
                placeholder="5678"
              />
            </div>
          </div>
        </div>

        {/* 기본배송지 저장 - 왼쪽 박스 */}
        {delivery.deliveryType === 'new' && (
          <div>
            <button
              type="button"
              onClick={() => {
                updateDelivery('isDefault', !delivery.isDefault);
              }}
              className="flex items-center gap-2"
            >
              <span className={clsx('h-3.5 w-3.5', delivery.isDefault ? 'bg-orange' : 'bg-grey-4')} />
              <span className={clsx('text-caption-01 font-medium', delivery.isDefault ? 'text-black' : 'text-grey-5')}>
                기본 배송지로 저장
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
