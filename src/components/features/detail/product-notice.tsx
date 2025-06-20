export default function ProductNotice() {
  return (
    <>
      <div className="flex items-start gap-4">
        <span className="w-20">배송안내</span>
        <span>1102942397492387</span>
      </div>
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">구매시 주의사항</span>
        <div className="flex flex-col items-start">
          <span>
            1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이 아닌
            자연스러운 제작 특성입니다.
          </span>
          <span>
            1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이 아닌
            자연스러운 제작 특성입니다.
          </span>
          <span>
            1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이 아닌
            자연스러운 제작 특성입니다.
          </span>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">사용시 주의사항</span>
        <div className="flex flex-col items-start">
          <span>
            강한 충격에 파손될 수 있으니 주의해 주세요/급격한 온도 변화는 균열의 원인이 될 수 있습니다/전자레인지, 오븐,
            식기세척기 사용 가능 여부는 제품 설명을 확인해 주세요.
          </span>
          <span>세척 시 부드러운 스펀지 사용을 권장드립니다.</span>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <span className="w-20 shrink-0">교환/환불 안내</span>
        <div className="flex flex-col items-start">
          <span>단순 변심에 의한 교환/환불은 제품 미사용 상태에 한해 가능하며, 왕복 배송비는 고객 부담입니다.</span>
          <span>다음의 경우 교환/환불이 어렵습니다:</span>
          <ul>
            <li>ㆍ사용 흔적이 있는 경우</li>
            <li>ㆍ고의 또는 부주의로 인한 파손/손상</li>
            <li>ㆍ제품 수령 후 2일이 지난 경우</li>
          </ul>
        </div>
      </div>
    </>
  );
}
