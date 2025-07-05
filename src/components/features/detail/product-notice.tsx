// src/components/features/detail/product-notice.tsx
import { PRODUCT_NOTICE_INFORMATION } from '@/lib/constants/product-notice-information';
import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';

export default function ProductNotice() {
  const { DELIVERY_INFO, PURCHASE_PRECAUTIONS, USAGE_PRECAUTIONS, EXCHANGE_REFUND_INFO } = PRODUCT_NOTICE_INFORMATION;

  return (
    <div className="text-grey-6 text-caption-01 flex flex-col items-start gap-3 self-stretch px-5 py-10 font-medium">
      {/* 배송안내 */}
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">{DELIVERY_INFO.title}</span>
        <span>{DELIVERY_INFO.content}</span>
      </div>

      {/* 구매시 주의사항 */}
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">{PURCHASE_PRECAUTIONS.title}</span>
        <div className="flex flex-col items-start">
          {PURCHASE_PRECAUTIONS.items.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>

      {/* 사용시 주의사항 */}
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">{USAGE_PRECAUTIONS.title}</span>
        <div className="flex flex-col items-start">{stringToMultilineTSX(USAGE_PRECAUTIONS.caution[0])}</div>
      </div>

      {/* 교환/환불 안내 */}
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">{EXCHANGE_REFUND_INFO.title}</span>
        <div className="flex flex-col items-start">
          {stringToMultilineTSX(EXCHANGE_REFUND_INFO.description[0])}
          <ul className="mt-1">
            {EXCHANGE_REFUND_INFO.restrictions.map((restriction, index) => (
              <li key={index}>ㆍ{restriction}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
