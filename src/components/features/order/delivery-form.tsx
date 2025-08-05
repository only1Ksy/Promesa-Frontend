'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import useAlert from '@/hooks/use-alert';
import { useOrderStore } from '@/lib/store/order-information-store';
import CloseIcon from '@/public/icons/layout/close.svg';
import { fetchDefaultAddress } from '@/services/api/address-controller';
import { AddressSchema } from '@/types/address-controller';

// import { fetchDefaultAddress } from '@/services/api/address-controller';
import OrderDropdown from './order-dropdown';

export default function DeliveryForm() {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const alertModal = useAlert();

  const delivery = useOrderStore((state) => state.delivery);
  const updateDelivery = useOrderStore((state) => state.updateDelivery);
  const resetDelivery = useOrderStore((state) => state.resetDelivery);

  useEffect(() => {
    const loadDefault = async () => {
      if (delivery.deliveryType === 'recent') {
        try {
          const defaultAddress: AddressSchema = await fetchDefaultAddress();
          console.log(defaultAddress);
          // 배송지가 없을 때 예외 처리
          if (!defaultAddress || defaultAddress.addressMain === '') {
            alertModal({
              message: '기본 배송지가 없습니다.\n새로운 배송지를 입력해주세요.',
              onConfirm: () => {
                updateDelivery('deliveryType', 'new');
              },
            });
            return;
          }

          updateDelivery('name', defaultAddress.recipientName);
          updateDelivery('postcode', defaultAddress.zipCode);
          updateDelivery('address', defaultAddress.addressMain);
          updateDelivery('addressDetail', defaultAddress.addressDetails);

          const [phone1, phone2, phone3] = defaultAddress.recipientPhone.split('-');
          updateDelivery('phone1', phone1);
          updateDelivery('phone2', phone2);
          updateDelivery('phone3', phone3);
        } catch (error) {
          console.error('기본 배송지 불러오기 실패:', error);
        }
      } else if (delivery.deliveryType === 'new') {
        resetDelivery();
      }
    };

    loadDefault();
  }, [delivery.deliveryType]);

  const openAddressSearch = () => {
    setIsPostcodeOpen(true);

    setTimeout(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          updateDelivery('postcode', data.zonecode);
          updateDelivery('address', data.address);
          setIsPostcodeOpen(false);
        },
      });

      (postcode as unknown as { embed: (el: HTMLElement) => void }).embed(
        document.getElementById('postcode-embed-container') as HTMLElement,
      );
    }, 0);
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
              className="flex cursor-pointer items-center gap-1.5"
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
          <div className="border-deep-green flex flex-col rounded-md border">
            <input
              type="text"
              value={delivery.name}
              onChange={(e) => updateDelivery('name', e.target.value)}
              className="w-full origin-left scale-[0.875] p-2.5 text-base outline-none"
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
            {isPostcodeOpen && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsPostcodeOpen(false)}
                  className="absolute right-1.25 bottom-[-63] z-55 cursor-pointer"
                >
                  <CloseIcon width={20} height={20} />
                </button>
                <div
                  id="postcode-embed-container"
                  style={{
                    transform: 'scale(0.725)',
                    transformOrigin: 'top left',
                    overflow: 'hidden',
                  }}
                  className="absolute z-50 shadow-lg"
                />
              </div>
            )}
            <div className="border-deep-green flex flex-col rounded-md border">
              <input
                type="text"
                value={delivery.address}
                readOnly
                placeholder="기본주소"
                className="w-full origin-left scale-[0.875] p-2.5 text-base outline-none"
              />
            </div>
            <div className="border-deep-green flex flex-col rounded-md border">
              <input
                type="text"
                value={delivery.addressDetail}
                onChange={(e) => updateDelivery('addressDetail', e.target.value)}
                placeholder="상세주소 (건물명, 호수 등)"
                className="w-full origin-left scale-[0.875] p-2.5 text-base outline-none"
              />
            </div>
          </div>

          {/* 연락처 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.75">
              <OrderDropdown items={phoneList} onSelect={handleSelect} width="w-64" />-
              <div className="border-deep-green flex flex-col rounded-md border">
                <input
                  type="text"
                  maxLength={4}
                  value={delivery.phone2}
                  onChange={(e) => updateDelivery('phone2', e.target.value)}
                  className="w-27 origin-left scale-[0.875] p-2.5 text-base outline-none"
                  placeholder="1234"
                  inputMode="numeric"
                />
              </div>
              -
              <div className="border-deep-green flex flex-col rounded-md border">
                <input
                  type="text"
                  maxLength={4}
                  value={delivery.phone3}
                  onChange={(e) => updateDelivery('phone3', e.target.value)}
                  className="w-27 origin-left scale-[0.875] p-2.5 text-base outline-none"
                  placeholder="5678"
                  inputMode="numeric"
                />
              </div>
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
              className="flex cursor-pointer items-center gap-2"
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
