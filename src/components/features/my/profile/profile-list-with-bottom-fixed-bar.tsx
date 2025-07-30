'use client';

import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

// import { fetchMe, patchMe, patchMeWithdraw } from '@/services/api/member-controller';
import { fetchMe } from '@/services/api/member-controller';

import BinaryComponent from './binary-components';
import InputComponent from './input-component';
import SelectComponent from './select-component';

export default function ProfileListWithBottomFixedBar() {
  const [nameValue, setNameValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const [addressMainValue, setAddressMainValue] = useState('');
  const [addressDetailsValue, setAddressDetailsValue] = useState('');
  const [phoneStartValue, setPhoneStartValue] = useState('010');
  const [phoneMiddleValue, setPhoneMiddleValue] = useState('0000');
  const [phoneEndValue, setPhoneEndValue] = useState('0000');
  const [smsAgreeValue, setSmsAgreeValue] = useState(true);
  const [genderValue, setGenderValue] = useState(true);
  const [birthYearValue, setBirthYearValue] = useState(0);
  const [birthMonthValue, setBirthMonthValue] = useState(0);
  const [birthDayValue, setBirthDayValue] = useState(0);
  const [isSolarValue, setIsSolarValue] = useState(true);

  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  useEffect(() => {
    setNameValue(data.profile.name);
    setZipCodeValue(data.address?.zipCode ?? '');
    setAddressMainValue(data.address?.addressMain ?? '');
    setAddressDetailsValue(data.address?.addressDetails ?? '');
    setPhoneStartValue(data.profile.phone ? data.profile.phone.split('-')[0] : '010');
    setPhoneMiddleValue(data.profile.phone ? data.profile.phone.split('-')[1] : '0000');
    setPhoneEndValue(data.profile.phone ? data.profile.phone.split('-')[2] : '0000');
    setSmsAgreeValue(data.profile.smsAgree);
    setGenderValue(data.profile.gender === 'FEMALE' ? true : false);
    setBirthYearValue(data.birth.birthYear ?? 0);
    setBirthMonthValue(data.birth.birthMonth ?? 0);
    setBirthDayValue(data.birth.birthDay ?? 0);
    setIsSolarValue(data.birth.isSolar ?? true);
  }, [data]);

  return (
    // 35 = 5.5 (margin-bottom) + 21 (bottom-fixed-bar) + 8.5 (indicator height)
    <div className="relative flex flex-col gap-7.5 pb-35">
      <div className="mt-5.5 flex flex-col gap-3.5">
        {/* 기본정보 */}
        <div className="flex flex-col gap-7.5">
          {/* 이름 */}
          <div className="mx-5 flex flex-col gap-3.5">
            <span className="text-headline-05 text-black">이름</span>
            <InputComponent value={nameValue} setValue={setNameValue} readOnly />
          </div>
          <hr className="border-t-green border-t" />
          {/* 주소 */}
          <div className="mx-5 flex flex-col gap-3.5">
            <span className="text-headline-05 text-black">주소 (기본 배송지)</span>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-3">
                <InputComponent value={zipCodeValue} setValue={setZipCodeValue} isHighlight />
                <button className="flex h-11 w-29 items-center justify-center bg-black p-2.5">
                  <p className="text-body-02 font-regular text-white">우편번호 검색</p>
                </button>
              </div>
              <InputComponent value={addressMainValue} setValue={setAddressMainValue} />
              <InputComponent value={addressDetailsValue} setValue={setAddressDetailsValue} />
            </div>
          </div>
          <hr className="border-t-green border-t" />
          {/* 휴대전화 */}
          <div className="mx-5 flex flex-col gap-3.5">
            <span className="text-headline-05 text-black">휴대전화</span>
            <div className="flex items-center gap-1.75">
              <InputComponent value={phoneStartValue} setValue={setPhoneStartValue} isHighlight />
              <hr className="w-1.5 border-t border-[#000000]" />
              <InputComponent value={phoneMiddleValue} setValue={setPhoneMiddleValue} />
              <hr className="w-1.5 border-t border-[#000000]" />
              <InputComponent value={phoneEndValue} setValue={setPhoneEndValue} />
            </div>
          </div>
          <hr className="border-t-green border-t" />
          {/* SMS 수신여부 */}
          <div className="mx-5 flex flex-col gap-5">
            <span className="text-headline-05 text-black">SMS 수신여부</span>
            <div className="flex flex-col gap-2">
              <BinaryComponent
                value={smsAgreeValue}
                setValue={setSmsAgreeValue}
                trueText="수신함"
                falseText="수신안함"
              />
              <p className="text-caption-01 text-grey-4 font-medium">
                프로메사에서 제공하는 이벤트 소식을 SNS로 받으실 수 있습니다
              </p>
            </div>
          </div>
        </div>
        {/* 추가정보 */}
        <div className="mx-5 flex items-center">
          <hr className="border-t-deep-green flex-1 border-t" />
          <div className="flex w-21.25 items-center justify-center p-2">
            <p className="text-subhead text-grey-9 font-medium">추가정보</p>
          </div>
          <hr className="border-t-deep-green flex-1 border-t" />
        </div>
        <div className="flex flex-col gap-6">
          {/* 성별 */}
          <div className="mx-5 flex flex-col gap-5">
            <span className="text-headline-05 text-black">성별</span>
            <BinaryComponent value={genderValue} setValue={setGenderValue} trueText="여성" falseText="남성" />
          </div>
          <hr className="border-t-green border-t" />
          {/* 생년월일 */}
          <div className="mx-5 flex flex-col gap-5">
            <span className="text-headline-05 text-black">생년월일</span>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <SelectComponent
                  value={birthYearValue}
                  setValue={setBirthYearValue}
                  optionList={[]}
                  widthClass="w-21.25"
                  isHighlight
                />
                <p className="text-body-02 font-medium text-[#000000]">년</p>
              </div>
              <div className="flex items-center gap-2">
                <SelectComponent
                  value={birthMonthValue}
                  setValue={setBirthMonthValue}
                  optionList={[]}
                  widthClass="w-15.25"
                />
                <p className="text-body-02 font-medium text-[#000000]">월</p>
              </div>
              <div className="flex items-center gap-2">
                <SelectComponent
                  value={birthDayValue}
                  setValue={setBirthDayValue}
                  optionList={[]}
                  widthClass="w-15.25"
                />
                <p className="text-body-02 font-medium text-[#000000]">일</p>
              </div>
            </div>
            <BinaryComponent value={isSolarValue} setValue={setIsSolarValue} trueText="양력" falseText="음력" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="cursor-pointer">
          <p className="text-grey-5 text-body-02 font-medium underline">회원 탈퇴하기</p>
        </button>
      </div>
      <div className="fixed-component bg-pale-green border-green bottom-0 border px-5 pt-3 pb-11.5 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
        <button className="w-full cursor-pointer">
          <div className="bg-grey-9 flex h-15 items-center justify-center rounded-xs">
            <p className="text-body-01 text-grey-1 font-bold">회원정보 수정</p>
          </div>
        </button>
      </div>
    </div>
  );
}
