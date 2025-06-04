import PromesaGreyIcon from '@/public/icons/default/promesa-grey-900.svg';

export default function Footer() {
  return (
    <div className="text-caption-01 text-grey-900 mx-5 mt-5 mb-9 flex flex-col gap-5">
      <div className="my-2.5 flex">
        <PromesaGreyIcon />
        <div className="h-[23px] w-[24px]"></div>
      </div>
      <div className="mb-1 flex gap-15 font-medium">
        <div className="flex flex-col gap-1">
          <p>02-1234-5678</p>
          <p>운영시간 오전 10시 - 오후 5시</p>
          <p>점심시간 오후 1시 - 오후 2시</p>
          <p>주말, 공휴일은 휴일입니다.</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>신한은행 110-455-229202</p>
          <p>예금주: 프로메사</p>
        </div>
      </div>
      <hr className="bg-grey-500 mb-1 h-[0.75px] w-full border-0" />
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-2.5">
            <p className="text-grey-600">법인명(상호)</p>
            <p>(주)프로메사</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">개인정보관리책임</p>
            <p>홍길동(hy5926@promesa.co.kr)</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">사업자등록번호</p>
            <p>123-45-67890</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">통신판매업신고</p>
            <p>1234-서울-12345</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">주소</p>
            <p>서울특별시 서대문구 연세로 50</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">전화</p>
            <p>02-1234-5678</p>
          </div>
          <div className="flex gap-2.5">
            <p className="text-grey-600">이메일</p>
            <p>contact@promesa.co.kr</p>
          </div>
        </div>
      </div>
      <div className="text-grey-600 flex gap-4">
        <p>회사소개</p>
        <p>이용약관</p>
        <p>개인정보처리방침</p>
        <p>이용안내</p>
      </div>
    </div>
  );
}
