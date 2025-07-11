'use client';

import { useOrderStore } from '@/lib/store/order-information-store';

import OrderDropdown from './order-dropdown';

export default function PayForm() {
  const payment = useOrderStore((state) => state.payment);
  const updatePayment = useOrderStore((state) => state.updatePayment);

  const handleSelectBank = (value: string) => {
    updatePayment('selectedBank', value);
  };

  const bankList = [
    { label: '은행 선택', value: '' },
    { label: '신한은행 123-456-789098', value: '신한은행 123-456-789098' },
    { label: '국민은행 123-456-789098', value: '국민은행 123-456-789098' },
  ];

  return (
    <section className="border-green flex flex-col gap-3.5 border-b px-5 pb-6.5">
      <div className="text-headline-05 font-bold">결제 수단</div>

      <div className="flex flex-col gap-3">
        <div className="flex h-6 w-89.5 items-center gap-3">
          <button
            type="button"
            aria-label="circle-button"
            className="h-4 w-4 rounded-full border-[4px] border-black bg-transparent"
          />
          <span className="text-body-01 font-medium">무통장 입금</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-body-02 flex flex-col gap-2.5 pl-5 font-medium">
            {/* 은행 선택 */}
            <div className="flex w-84.5 flex-col gap-1">
              <OrderDropdown items={bankList} onSelect={handleSelectBank} />
            </div>

            {/* 입금자명 */}
            <div className="flex w-84.5 flex-col">
              <input
                type="text"
                value={payment.depositor}
                onChange={(e) => updatePayment('depositor', e.target.value)}
                className="border-deep-green rounded-md border p-2.5 outline-none"
                placeholder="입금자명"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
