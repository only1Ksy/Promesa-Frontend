'use client';

import { useState } from 'react';
import clsx from 'clsx';

export default function DeliveryForm() {
  const [form, setForm] = useState({
    name: '',
    phone1: '010',
    phone2: '',
    phone3: '',
    postcode: '',
    address: '',
    addressDetail: '',
    isDefault: false,
    deliveryType: 'new' as 'recent' | 'new',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openAddressSearch = () => {
    if (typeof window === 'undefined' || !window.daum?.Postcode) return;

    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((prev) => ({
          ...prev,
          postcode: data.zonecode,
          address: data.address,
        }));
      },
    }).open();
  };

  return (
    <section className="flex flex-col gap-3.5 px-5 pb-6.5">
      <div className="text-headline-05 font-bold">배송지</div>
      <div className="flex flex-col gap-6">
        {/* 최근 배송지 / 새로운 배송지 선택 */}
        <div className="flex items-center gap-3.5">
          {[
            { key: 'recent', label: '최근 배송지' },
            { key: 'new', label: '새로운 배송지' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleChange('deliveryType', key)}
              className="flex items-center gap-1.5"
            >
              <span className={clsx('h-3.5 w-3.5', form.deliveryType === key ? 'bg-orange' : 'bg-grey-4')} />
              <span
                className={clsx(
                  'text-caption-01 font-medium',
                  form.deliveryType === key ? 'text-black' : 'text-grey-5',
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
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="border-deep-green rounded-md border p-2.5"
              placeholder="이름"
            />
          </div>

          {/* 주소 */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <input
                type="text"
                value={form.postcode}
                placeholder="우편번호"
                readOnly
                className="bg-green w-58.75 rounded-md p-2.5"
              />
              <button
                onClick={openAddressSearch}
                type="button"
                className="text-body-02 font-regular w-29 rounded-md bg-black px-4 py-2 text-white"
              >
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              value={form.address}
              readOnly
              placeholder="기본주소"
              className="border-deep-green rounded-md border p-2.5"
            />
            <input
              type="text"
              value={form.addressDetail}
              onChange={(e) => handleChange('addressDetail', e.target.value)}
              placeholder="상세주소 (건물명, 호수 등)"
              className="border-deep-green rounded-md border p-2.5"
            />
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.75">
              <select
                value={form.phone1}
                onChange={(e) => handleChange('phone1', e.target.value)}
                className="bg-green w-27 rounded-md p-3"
              >
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
              </select>
              -
              <input
                type="text"
                maxLength={4}
                value={form.phone2}
                onChange={(e) => handleChange('phone2', e.target.value)}
                className="border-deep-green w-27 rounded-md border p-2.5"
                placeholder="1234"
              />
              -
              <input
                type="text"
                maxLength={4}
                value={form.phone3}
                onChange={(e) => handleChange('phone3', e.target.value)}
                className="border-deep-green w-27 rounded-md border p-2.5"
                placeholder="5678"
              />
            </div>
          </div>
        </div>
        {/* 기본배송지 저장 - 왼쪽 박스 */}
        <div>
          <button
            type="button"
            onClick={() => handleChange('isDefault', !form.isDefault)}
            className="flex items-center gap-2"
          >
            <span className={clsx('h-3.5 w-3.5', form.isDefault ? 'bg-orange' : 'bg-grey-4')} />
            <span className={clsx('text-caption-01 font-medium', form.isDefault ? 'text-black' : 'text-grey-5')}>
              기본 배송지로 저장
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
