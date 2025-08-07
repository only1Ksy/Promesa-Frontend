'use client';

// import React, { useEffect, useRef, useState } from 'react';
import React, { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Link from 'next/link';

// import { useRouter } from 'next/navigation';
import { registerArtist } from '@/services/api/admin/admin-artist-controller';
// import { fetchMembers } from '@/services/api/admin/admin-member-controller';
import { deleteImages, postImages } from '@/services/api/image-controller';
import { getQueryClient } from '@/services/query/client';
// import type { MemberResponseSchema } from '@/types/member-controller';

export default function AdminArtistRegisterPage() {
  // const router = useRouter();
  const queryClient = getQueryClient();

  const [form, setForm] = useState({
    artistName: '',
    subName: '',
    profileKey: '',
    description: '',
    insta: '',
    memberId: 0,
  });
  // const [members, setMembers] = useState<MemberResponseSchema[]>([]);
  const [error, setError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const fetchAndSet = async () => {
  //     try {
  //       const data = await fetchMembers();
  //       setMembers(data);
  //     } catch {
  //       setError(true);
  //       router.replace('/admin/artist');
  //     }
  //   };

  //   fetchAndSet();
  // }, [error, router]);

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

    if (form.profileKey !== '') {
      await deleteImages(form.profileKey);
      setForm((prev) => ({ ...prev, profileKey: '' }));
    }

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

    setForm({
      artistName: '',
      subName: '',
      profileKey: '',
      description: '',
      insta: '',
      memberId: 0,
    });
    setError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      title: '6️⃣ 아티스트 프로필 이미지',
    },
    description: {
      title: '3️⃣ 아티스트 설명',
    },
    insta: {
      title: '4️⃣ 아티스트 인스타그램 ID',
    },
    memberId: {
      title: '5️⃣ 아티스트 - 멤버',
    },
  } as const;

  if (error) return null;

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 flex flex-col pl-5">
        <p className="text-headline-04">아티스트 등록하기</p>
        <Link href="/admin/artist">
          <p className="text-orange text-headline-04">뒤로가기</p>
        </Link>
      </div>
      <div className="mx-5 mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {/* 아티스트 텍스트 정보 입력 */}
          {(Object.keys(form) as (keyof typeof form)[])
            .filter((key) => !['profileKey'].includes(key))
            .map((key) => (
              <React.Fragment key={key}>
                <div className="flex flex-col gap-2">
                  <p className="text-body-01 font-semibold">{formKeyMap[key].title}</p>
                  {key === 'insta' && (
                    <p className="text-body-02 font-regular text-orange italic">* 인스타그램 영문 ID만 입력</p>
                  )}
                </div>
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
          {/* 아티스트 ID 정보 입력 */}
          {/* <div className="flex justify-between gap-5">
            <p className="text-body-01 font-semibold">{formKeyMap['memberId'].title}</p>
          </div>
          <select
            name={formKeyMap['memberId'].title}
            value={form.memberId}
            onChange={(e) => handleForm('memberId', Number(e.target.value))}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          >
            <option value={0} disabled />
            {members.map((item) => (
              <option key={item.profile.providerId} value={item.profile.providerId} className="cursor-pointer">
                {`${item.profile.name} (성별: ${item.profile.gender}, 전화번호: ${item.profile.phone})`}
              </option>
            ))}
          </select> */}
          {/* 아티스트 이미지 정보 입력 */}
          <div className="flex flex-col gap-2">
            <p className="text-body-01 font-semibold">{formKeyMap['profileKey'].title}</p>
            <p className="text-body-02 font-regular text-orange italic">* width: 402px, height: 200px</p>
          </div>
          <input
            name={formKeyMap['profileKey'].title}
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProfileImage(file);
            }}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          />
          {/* 아티스트 등록 */}
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
