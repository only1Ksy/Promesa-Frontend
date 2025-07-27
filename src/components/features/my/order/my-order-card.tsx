'use client';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';

interface MyOrderCardProps {
  status: string;
  shipComment: string;
  url: string;
  title: string;
  price: number;
  itemCount: number;
}

export default function MyOrderCard({ status, shipComment, url, title, price, itemCount }: MyOrderCardProps) {
  const isCancelButton = status === '입금확인중' || '배송준비중';
  const isReturnExchangeButton = status === '배송중' || '배송완료';

  const renderButtons = () => {
    if (isCancelButton) {
      return (
        <>
          <button className="text-body-02 flex h-full w-44.25 cursor-pointer items-center justify-center rounded-xs border font-medium">
            취소 접수
          </button>
          <button className="text-body-02 flex h-full w-44.25 cursor-pointer items-center justify-center rounded-xs border font-medium">
            문의하기
          </button>
        </>
      );
    } else if (isReturnExchangeButton) {
      return (
        <>
          <button className="text-body-02 flex h-full w-28.75 cursor-pointer items-center justify-center rounded-xs border font-medium">
            반품 접수
          </button>
          <button className="text-body-02 flex h-full w-28.75 cursor-pointer items-center justify-center rounded-xs border font-medium">
            교환 접수
          </button>
          <button className="text-body-02 flex h-full w-28.75 cursor-pointer items-center justify-center rounded-xs border font-medium">
            문의하기
          </button>
        </>
      );
    }
    return (
      <>
        <button className="text-body-02 border-grey-5 text-grey-5 flex h-full w-28.75 cursor-not-allowed items-center justify-center rounded-xs border font-medium">
          반품 접수
        </button>
        <button className="text-body-02 border-grey-5 text-grey-5 flex h-full w-28.75 cursor-not-allowed items-center justify-center rounded-xs border font-medium">
          교환 접수
        </button>
        <button className="text-body-02 flex h-full w-28.75 cursor-pointer items-center justify-center rounded-xs border font-medium">
          문의하기
        </button>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4.5">
      <div className="flex flex-col gap-3.5">
        <div className="flex gap-3.5 px-5">
          <div className="h-28.75 w-23">
            <ImageWithEffect fill src={url} alt={'상품 미리보기 이미지'} className="object-cover" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-body-01 text-orange font-bold overflow-ellipsis">{status}</span>
              <span className="text-grey-6 text-body-01 font-medium overflow-ellipsis">{shipComment}</span>
            </div>
            <span className="text-body-01 text-grey-9 font-bold overflow-ellipsis">{title}</span>
            <span className="text-body-02 text-grey-6 font-medium">{`${price.toLocaleString()}원 / 수량: ${itemCount}개`}</span>
          </div>
        </div>
      </div>
      <div className="flex h-10.5 items-center justify-center gap-2 px-5">{renderButtons()}</div>
    </div>
  );
}
