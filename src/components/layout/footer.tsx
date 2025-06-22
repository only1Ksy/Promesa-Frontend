import { BUSINESS_INFORMATION } from '@/lib/constants/business-information';
import PromesaTextExtraSmallIcon from '@/public/icons/logo/text-xs.svg';

export default function Footer() {
  const upperLeftKeys = ['전화', '운영시간', '점심시간', '휴일'] as const;
  const upperRightKeys = ['계좌', '예금주'] as const;
  const lowerKeys = [
    '법인명(상호)',
    '개인정보관리책임',
    '사업자등록번호',
    '통신판매업신고',
    '주소',
    '전화',
    '이메일',
  ] as const;

  return (
    <div className="text-caption-01 text-grey-9 bg-green relative z-5 flex flex-col gap-5 px-5 pt-5 pb-9 font-medium">
      <div className="my-2.5 flex items-center">
        <PromesaTextExtraSmallIcon className="text-black" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-15">
          <div className="flex flex-col gap-1">
            {upperLeftKeys.map((key) =>
              BUSINESS_INFORMATION[key] ? <p key={`footer-upper-left-${key}`}>{BUSINESS_INFORMATION[key]}</p> : null,
            )}
          </div>
          <div className="flex flex-col gap-1">
            {upperRightKeys.map((key) =>
              BUSINESS_INFORMATION[key] ? <p key={`footer-upper-right-${key}`}>{BUSINESS_INFORMATION[key]}</p> : null,
            )}
          </div>
        </div>
        <hr className="border-grey-5 w-full" />
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-0.5">
            {lowerKeys.map((key) =>
              BUSINESS_INFORMATION[key] ? (
                <div key={`footer-lower-${key}`} className="flex gap-2.5">
                  <p className="text-grey-6">{key}</p>
                  <p>{BUSINESS_INFORMATION[key]}</p>
                </div>
              ) : null,
            )}
          </div>
          <div className="text-grey-6 mb-4 flex gap-4">
            <p>회사소개</p>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
            <p>이용안내</p>
          </div>
        </div>
      </div>
    </div>
  );
}
