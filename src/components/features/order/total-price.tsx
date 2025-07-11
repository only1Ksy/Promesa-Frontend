interface TotalPriceProps {
  total: number;
}

export default function TotalPrice({ total }: TotalPriceProps) {
  return (
    <div className="flex flex-col gap-3.5 px-5">
      <div className="text-headline-05 flex items-center justify-between">
        <span>총 결제 금액</span>
        <span className="text-orange">{(total > 70000 ? total : total + 3000).toLocaleString()}원</span>
      </div>
      <div className="text-body-01 flex flex-col gap-2 font-medium">
        <div className="flex items-center justify-between">
          <span>총 상품 금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <div className="flex items-center justify-between">
          <span>배송비</span>
          <span>+{(total > 70000 ? 0 : 3000).toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
