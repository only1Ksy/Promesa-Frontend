export default function CartTotalPrice() {
  return (
    <div className="flex flex-col gap-6.5 px-5 pb-10">
      <div className="text-body-01 flex flex-col gap-2 font-medium">
        <div className="flex items-center justify-between">
          <span className="text-grey-6">상품 금액</span>
          <span>{(28000).toLocaleString()}원</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-grey-6">배송비</span>
          <span>{(3000).toLocaleString()}원</span>
        </div>
      </div>
      <div className="text-subhead flex items-center justify-between font-bold">
        <span>총 결제 금액</span>
        <span className="text-orange">{(31000).toLocaleString()}원</span>
      </div>
    </div>
  );
}
