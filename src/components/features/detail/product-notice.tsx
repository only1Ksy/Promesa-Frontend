import { PRODUCT_NOTICE_INFORMATION } from '@/lib/constants/product-notice-information';

export default function ProductNotice() {
  const { DELIVERY_INFO, PURCHASE_PRECAUTIONS, USAGE_PRECAUTIONS, EXCHANGE_REFUND_INFO } = PRODUCT_NOTICE_INFORMATION;

  return (
    <div className="text-grey-6 text-caption-01 mb-10 flex min-h-100 scroll-mt-24 flex-col items-start gap-3 self-stretch px-5 py-10 font-medium">
      {/* 배송안내 */}
      <div className="flex items-start gap-4">
        <span className="w-20">{DELIVERY_INFO.title}</span>
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
        <div className="flex flex-col items-start">
          {USAGE_PRECAUTIONS.items.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>

      {/* 교환/환불 안내 */}
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">{EXCHANGE_REFUND_INFO.title}</span>
        <div className="flex flex-col items-start">
          {EXCHANGE_REFUND_INFO.description.map((desc, index) => (
            <span key={index}>{desc}</span>
          ))}
          <ul>
            {EXCHANGE_REFUND_INFO.restrictions.map((restriction, index) => (
              <li key={index}>ㆍ{restriction}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
