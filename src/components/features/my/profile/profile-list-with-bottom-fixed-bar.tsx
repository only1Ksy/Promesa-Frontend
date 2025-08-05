'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import useAlert from '@/hooks/use-alert';
import { useAuthStore } from '@/lib/store/use-auth-store';
import { logoutOnce } from '@/services/api/axios/auth';
import { fetchMe, patchMe, patchMeWithdraw } from '@/services/api/member-controller';
import { getQueryClient } from '@/services/query/client';
import type { MemberUpdateRequestSchema } from '@/types/member-controller';

import BinaryComponent from './binary-components';
import InputComponent from './input-component';
import SelectComponent from './select-component';

export default function ProfileListWithBottomFixedBar() {
  const now = useMemo(() => new Date(), []);

  const [initialData, setInitialData] = useState<MemberUpdateRequestSchema | null>(null);

  const [nameValue, setNameValue] = useState('');
  const [zipCodeValue, setZipCodeValue] = useState('');
  const [addressMainValue, setAddressMainValue] = useState('');
  const [addressDetailsValue, setAddressDetailsValue] = useState('');
  const [phoneStartValue, setPhoneStartValue] = useState('010');
  const [phoneMiddleValue, setPhoneMiddleValue] = useState('');
  const [phoneEndValue, setPhoneEndValue] = useState('');
  const [smsAgreeValue, setSmsAgreeValue] = useState(true);
  const [genderValue, setGenderValue] = useState<MemberUpdateRequestSchema['gender']>(null);
  const [birthYearValue, setBirthYearValue] = useState(0);
  const [birthMonthValue, setBirthMonthValue] = useState(0);
  const [birthDayValue, setBirthDayValue] = useState(0);
  const [isSolarValue, setIsSolarValue] = useState(true);

  const [phoneAlertText, setPhoneAlertText] = useState<string | null>(null);
  const [birthAlertText, setBirthAlertText] = useState<string | null>(null);

  const alertModal = useAlert();

  // non-change values
  const [recipientNameValue, setRecipientNameValue] = useState('');
  const [recipientPhoneValue, setRecipientPhoneValue] = useState('');

  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  // set initial data
  useEffect(() => {
    // profile
    const { name, phone: rawPhone, smsAgree, gender } = data.profile;
    const phone = rawPhone ?? '010--';
    const [start, middle, end] = phone.split('-');

    // birth
    const {
      birthYear: rawBirhtYear,
      birthMonth: rawBirhtMonth,
      birthDay: rawBirthDay,
      isSolar: rawIsSoloar,
    } = data.birth;
    const birthYear = rawBirhtYear ?? 0;
    const birthMonth = rawBirhtMonth ?? 0;
    const birthDay = rawBirthDay ?? 0;
    const isSolar = rawIsSoloar ?? true;

    // address
    const address = data.address ?? {};
    const { recipientName = '', zipCode = '', addressMain = '', addressDetails = '', recipientPhone = '' } = address;

    setNameValue(name);
    setPhoneStartValue(start);
    setPhoneMiddleValue(middle);
    setPhoneEndValue(end);
    setSmsAgreeValue(smsAgree);
    setGenderValue(gender);
    setBirthYearValue(birthYear);
    setBirthMonthValue(birthMonth);
    setBirthDayValue(birthDay);
    setIsSolarValue(isSolar);
    setZipCodeValue(zipCode);
    setAddressMainValue(addressMain);
    setAddressDetailsValue(addressDetails);

    setRecipientNameValue(recipientName);
    setRecipientPhoneValue(recipientPhone);

    setInitialData({
      phone,
      smsAgree,
      gender,
      birth: {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        solar: isSolar,
      },
      address: {
        recipientName,
        zipCode,
        addressMain,
        addressDetails,
        recipientPhone,
      },
    });
  }, [data]);

  // handle data change
  const currentData: MemberUpdateRequestSchema = useMemo(
    () => ({
      phone: `${phoneStartValue}-${phoneMiddleValue}-${phoneEndValue}`,
      smsAgree: smsAgreeValue,
      gender: genderValue,
      birth: {
        year: birthYearValue,
        month: birthMonthValue,
        day: birthDayValue,
        solar: isSolarValue,
      },
      address: {
        recipientName: recipientNameValue,
        zipCode: zipCodeValue,
        addressMain: addressMainValue,
        addressDetails: addressDetailsValue,
        recipientPhone: recipientPhoneValue,
      },
    }),
    [
      phoneStartValue,
      phoneMiddleValue,
      phoneEndValue,
      smsAgreeValue,
      genderValue,
      birthYearValue,
      birthMonthValue,
      birthDayValue,
      isSolarValue,
      recipientNameValue,
      zipCodeValue,
      addressMainValue,
      addressDetailsValue,
      recipientPhoneValue,
    ],
  );

  const isModified = useMemo(() => {
    return JSON.stringify(initialData) !== JSON.stringify(currentData);
  }, [initialData, currentData]);

  // address search (DAUM)
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: { zonecode: string; address: string }) => {
        setZipCodeValue(data.zonecode);
        setAddressMainValue(data.address);
      },
    }).open();
  };

  // handle submit
  const handleSubmit = async () => {
    // necessary full phone number
    const isValidPhoneNumber =
      `${phoneStartValue}-${phoneMiddleValue}-${phoneEndValue}` === initialData?.phone ||
      (phoneMiddleValue !== '' && phoneEndValue !== '');
    if (!isValidPhoneNumber) {
      setPhoneAlertText('유효한 전화번호를 입력해야 합니다.');

      const element = document.getElementById('phone-value-component');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      return null;
    }
    setPhoneAlertText(null);

    // necessary birth information
    if (
      !((birthYearValue && birthMonthValue && birthDayValue) || (!birthYearValue && !birthMonthValue && !birthDayValue))
    ) {
      setBirthAlertText('유효한 생년월일을 입력해야 합니다.');

      const element = document.getElementById('birth-value-component');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      return null;
    }
    setBirthAlertText(null);

    const payload = {
      phone: `${phoneStartValue}-${phoneMiddleValue}-${phoneEndValue}`,
      smsAgree: smsAgreeValue,
      gender: genderValue,
      birth: {
        year: birthYearValue,
        month: birthMonthValue,
        day: birthDayValue,
        solar: isSolarValue,
      },
      address: {
        recipientName: recipientNameValue,
        zipCode: zipCodeValue,
        addressMain: addressMainValue,
        addressDetails: addressDetailsValue,
        recipientPhone: recipientPhoneValue,
      },
    };

    await patchMe(payload);

    const queryClient = getQueryClient();
    await queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  // withdraw
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setHasChecked = useAuthStore((s) => s.setHasChecked);
  const logout = async () => {
    await logoutOnce();
    setLoggedIn(false);
    setHasChecked(true);
    window.location.replace('/');
  };

  const handleWithdraw = () => {
    alertModal({
      message: '정말 회원 탈퇴를 진행하시겠습니까?\n탈퇴 시 모든 정보는 삭제되며, 복구가 불가능합니다.',
      confirmText: '진행',
      cancelText: '취소',
      onConfirm: async () => {
        await patchMeWithdraw();
        logout();
      },
    });
  };

  return (
    // 35 = 5.5 (margin-bottom) + 21 (bottom-fixed-bar) + 8.5 (indicator height)
    <div className="relative flex flex-col gap-7.5 pb-35">
      <div className="mt-5.5 flex flex-col gap-3.5">
        {/* 기본정보 */}
        <div className="flex flex-col gap-7.5">
          {/* 이름 */}
          <div className="mx-5 flex flex-col gap-3.5">
            <span className="text-headline-05 text-black">이름</span>
            <InputComponent name="이름" value={nameValue} setValue={setNameValue} readOnly />
          </div>
          <hr className="border-t-green border-t" />
          {/* 주소 */}
          <div className="mx-5 flex flex-col gap-3.5">
            <span className="text-headline-05 text-black">주소 (기본 배송지)</span>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-3">
                <InputComponent
                  name="주소 (기본 배송지)"
                  value={zipCodeValue}
                  setValue={setZipCodeValue}
                  readOnly
                  isHighlight
                />
                <button onClick={openAddressSearch} className="cursor-pointer">
                  <div className="flex h-11.5 w-29 items-center justify-center rounded-sm bg-black p-2.5">
                    <p className="text-body-02 font-regular text-white">우편번호 검색</p>
                  </div>
                </button>
              </div>
              <InputComponent name="기본 주소" value={addressMainValue} setValue={setAddressMainValue} readOnly />
              <InputComponent name="세부 주소" value={addressDetailsValue} setValue={setAddressDetailsValue} />
            </div>
          </div>
          <hr className="border-t-green border-t" />
          {/* 휴대전화 */}
          <div className="mx-5 flex flex-col gap-4">
            <span className="text-headline-05 text-black">휴대전화</span>
            <div className="flex items-center gap-1.75">
              <SelectComponent
                name="시작 전화번호"
                value={phoneStartValue}
                setValue={setPhoneStartValue}
                optionList={['010', '011', '012', '013', '014', '015', '016', '017', '018', '019']}
                widthClass="flex-1"
                isHighlight
              />
              <hr className="w-1.5 border-t border-[#000000]" />
              <InputComponent name="중간 전화번호" value={phoneMiddleValue} setValue={setPhoneMiddleValue} isPhone />
              <hr className="w-1.5 border-t border-[#000000]" />
              <InputComponent name="끝 전화번호" value={phoneEndValue} setValue={setPhoneEndValue} isPhone />
            </div>
            {phoneAlertText && <span className="text-caption-01 text-orange -mt-1 font-bold">{phoneAlertText}</span>}
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
          <div id="gender-value-component" className="mx-5 flex flex-col gap-5">
            <span className="text-headline-05 text-black">성별</span>
            <BinaryComponent
              value={genderValue === 'FEMALE'}
              setValue={(v) => setGenderValue(v ? 'FEMALE' : 'MALE')}
              trueText="여성"
              falseText="남성"
              isNull={genderValue === null}
            />
          </div>
          <hr className="border-t-green border-t" />
          {/* 생년월일 */}
          <div className="mx-5 flex flex-col gap-5">
            <span className="text-headline-05 text-black">생년월일</span>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <SelectComponent
                  name="년도"
                  value={birthYearValue}
                  setValue={setBirthYearValue}
                  optionList={Array.from({ length: 100 }, (_, i) => now.getFullYear() - 99 + i)}
                  widthClass="w-21.25"
                  isPlaceholder
                />
                <p className="text-body-02 font-medium text-[#000000]">년</p>
              </div>
              <div className="flex items-center gap-2">
                <SelectComponent
                  name="월"
                  value={birthMonthValue}
                  setValue={setBirthMonthValue}
                  optionList={Array.from({ length: 12 }, (_, i) => i + 1)}
                  widthClass="w-16.25"
                  isPlaceholder
                />
                <p className="text-body-02 font-medium text-[#000000]">월</p>
              </div>
              <div className="flex items-center gap-2">
                <SelectComponent
                  name="일"
                  value={birthDayValue}
                  setValue={setBirthDayValue}
                  optionList={Array.from({ length: 31 }, (_, i) => i + 1)}
                  widthClass="w-16.25"
                  isPlaceholder
                />
                <p className="text-body-02 font-medium text-[#000000]">일</p>
              </div>
            </div>
            <BinaryComponent value={isSolarValue} setValue={setIsSolarValue} trueText="양력" falseText="음력" />
            {birthAlertText && <span className="text-caption-01 text-orange -mt-2 font-bold">{birthAlertText}</span>}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="cursor-pointer" onClick={handleWithdraw}>
          <p className="text-grey-5 text-body-02 font-medium underline">회원 탈퇴하기</p>
        </button>
      </div>
      <div className="fixed-component bg-pale-green border-green bottom-0 border px-5 pt-3 pb-11.5 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
        <button
          className={clsx('w-full', isModified && 'cursor-pointer')}
          disabled={!isModified}
          onClick={handleSubmit}
        >
          <div
            className={clsx('flex h-15 items-center justify-center rounded-xs', isModified ? 'bg-grey-9' : 'bg-grey-4')}
          >
            <p className="text-body-01 text-grey-1 font-bold">회원정보 수정</p>
          </div>
        </button>
      </div>
    </div>
  );
}
