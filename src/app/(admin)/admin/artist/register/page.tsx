'use client';

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Link from 'next/link';

import { registerArtist } from '@/services/api/admin/admin-artist-controller';
import { postImages } from '@/services/api/image-controller';
import { getQueryClient } from '@/services/query/client';

export default function AdminArtistRegisterPage() {
  const queryClient = getQueryClient();

  const [form, setForm] = useState({
    artistName: '',
    subName: '',
    profileKey: '',
    description: '',
    insta: '',
    memberId: 0,
  });

  const handleForm = (field: keyof typeof form, value: string | number | null) => {
    if (field === 'memberId' && typeof value !== 'number') return;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileImage = async (file: File) => {
    const { key: profileKey, url } = (
      await postImages({
        imageType: 'ARTIST',
        referenceId: null,
        subType: 'PROFILE',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setForm((prev) => ({ ...prev, profileKey }));
  };

  const register = async () => {
    if (form.artistName === '' || form.profileKey === '' || form.description === '' || form.memberId === 0) return;

    await registerArtist({
      ...form,
      subName: form.subName === '' ? null : form.subName,
      insta: form.insta === '' ? null : form.insta,
    });

    queryClient.refetchQueries({ queryKey: ['admin-artist-list'] });
  };

  const formKeyMap: {
    [K in keyof typeof form]: {
      title: string;
    };
  } = {
    artistName: {
      title: '1️⃣ 아티스트 이름',
    },
    subName: {
      title: '2️⃣ 아티스트 서브 이름',
    },
    profileKey: {
      title: '3️⃣ 아티스트 프로필 이미지',
    },
    description: {
      title: '4️⃣ 아티스트 설명',
    },
    insta: {
      title: '5️⃣ 아티스트 인스타그램 주소',
    },
    memberId: {
      title: '6️⃣ 아티스트 ID',
    },
  } as const;

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 flex flex-col pl-5">
        <p className="text-headline-04">아티스트 추가하기</p>
        <Link href="/admin/artist">
          <p className="text-orange text-headline-04">뒤로가기</p>
        </Link>
      </div>
      <div className="mx-5 mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {/* 아티스트 텍스트 정보 입력 */}
          {(Object.keys(form) as (keyof typeof form)[])
            .filter((key) => key !== 'profileKey')
            .map((key) => (
              <React.Fragment key={key}>
                <p className="text-body-01 font-semibold">{formKeyMap[key].title}</p>
                {key !== 'memberId' ? (
                  <TextareaAutosize
                    name={formKeyMap[key].title}
                    value={form[key]}
                    onChange={(e) => handleForm(key, e.target.value)}
                    className="border-deep-green text-body-01 resize-none rounded-sm border px-2 py-1 font-semibold outline-none"
                  />
                ) : (
                  <input
                    name={formKeyMap[key].title}
                    type="number"
                    value={form[key]}
                    min={0}
                    onChange={(e) => handleForm(key, Number(e.target.value))}
                    className="border-deep-green text-body-01 resize-none rounded-sm border px-2 py-1 font-semibold outline-none"
                  />
                )}
              </React.Fragment>
            ))}
          {/* 아티스트 이미지 정보 입력 */}
          <p className="text-body-01 font-semibold">7️⃣ 아티스트 프로필 이미지</p>
          <input
            name="아티스트 프로필 이미지 선택"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProfileImage(file);
            }}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          />
          <button onClick={register} className="cursor-pointer">
            <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
              <p className="text-body-01 font-semibold">등록하기</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
