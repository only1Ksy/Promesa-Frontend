'use client';

import CopyIcon from '@/public/icons/layout/copy.svg';

export default function OrderInformation() {
  const copyClipBoard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex w-full flex-col items-end gap-2">
      <div className="bg-green flex w-full flex-col gap-4.75 rounded-sm p-7">
        {/* 위 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">주문 상품</span>
            <span className="text-body-02 font-medium">빈티지 블랙 높은 잔 세트</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-body-02 font-bold">배송지</span>
            <div className="flex flex-col text-right">
              <p className="text-body-02 font-medium">서울특별시 서대문구 연세로</p>
              <p className="text-body-02 font-medium">제 4공학관 A567호</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">결제 금액</span>
            <span className="text-body-02 font-medium">165,000원</span>
          </div>
        </div>
        <hr
          className="border-grey-4 w-full border-t-2"
          style={{
            borderStyle: 'dashed',
            borderWidth: '0.5px',
            borderImage: 'repeating-linear-gradient(to right, #9ca3af 0 3px, transparent 3px 6px) 100',
          }}
        />
        {/* 아래 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">은행명</span>
            <span className="text-body-02 font-bold">신한은행</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="text-body-02 font-bold">예금주</span>
            <span className="text-body-02 font-medium">이호영</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">계좌번호</span>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer" onClick={() => copyClipBoard('110-123-456789')}>
                <CopyIcon width={16} height={16} />
              </button>
              <span className="text-body-02 font-medium">110-123-456789</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">입금 금액</span>
            <span className="text-body-02 font-medium">165,000원</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body-02 font-bold">입금 기한</span>
            <span className="text-body-02 text-orange font-medium">2025년 6월 27일 오후 8시까지</span>
          </div>
        </div>
      </div>
      <p className="text-caption-01 text-grey-5 text-right font-medium">
        *입금 기한까지 입금하지 않으면 주문은 자동 취소됩니다.
      </p>
    </div>
  );
}
