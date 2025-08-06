'use client';

import React, { useEffect, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { updateArtistInfo, updateArtistProfileImage } from '@/services/api/admin/admin-artist-controller';
import { fetchArtistList } from '@/services/api/artist-controller';
import { postImages } from '@/services/api/image-controller';
import { getQueryClient } from '@/services/query/client';
import type { ArtistProfileSchema } from '@/types/artist.dto';

export default function AdminArtistUpdatePage() {
  const [selectedArtistId, setSelectedArtistId] = useState<number>(0);

  const queryClient = getQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ['admin-artist-list'],
    queryFn: fetchArtistList,
  });

  const selectedArtist = useMemo(
    () => data.find((item) => item.profile.artistId === selectedArtistId),
    [selectedArtistId, data],
  );

  const [form, setForm] = useState({
    artistName: '',
    subName: '',
    description: '',
    insta: '',
  });

  const [profileImageKey, setProfileImageKey] = useState('');

  useEffect(() => {
    if (selectedArtist) {
      setForm({
        artistName: selectedArtist.profile.name ?? '',
        subName: selectedArtist.profile.subname ?? '',
        description: selectedArtist.profile.bio ?? '',
        insta: selectedArtist.profile.instagramUrl ?? '',
      });
    }
  }, [selectedArtist]);

  const handleForm = (field: keyof typeof form, value: string | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const update = async (field: keyof typeof form | 'profileImageKey') => {
    if (field === 'profileImageKey') {
      await updateArtistProfileImage(selectedArtistId, { profileImageKey });
    } else {
      const updatedValue = form[field] === '' && (field === 'subName' || field === 'insta') ? null : form[field];
      await updateArtistInfo(selectedArtistId, { [field]: updatedValue });
    }

    queryClient.refetchQueries({ queryKey: ['admin-artist-list'] });
  };

  const handleProfileImage = async (file: File) => {
    const { key, url } = (
      await postImages({
        imageType: 'ARTIST',
        referenceId: selectedArtistId,
        subType: 'PROFILE',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setProfileImageKey(key);
  };

  const formKeyMap: {
    [K in keyof typeof form]: {
      title: string;
      valueKey: keyof ArtistProfileSchema;
    };
  } = {
    artistName: {
      title: '아티스트 이름',
      valueKey: 'name',
    },
    subName: {
      title: '아티스트 서브 이름',
      valueKey: 'subname',
    },
    description: {
      title: '아티스트 설명',
      valueKey: 'bio',
    },
    insta: {
      title: '아티스트 인스타그램 주소',
      valueKey: 'instagramUrl',
    },
  } as const;

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 flex flex-col pl-5">
        <p className="text-headline-04">아티스트 수정하기</p>
        <Link href="/admin/artist">
          <p className="text-orange text-headline-04">뒤로가기</p>
        </Link>
      </div>
      {/* 아티스트 선택 */}
      <div className="flex justify-center gap-5">
        <p className="text-body-01 font-bold">아티스트를 선택하세요</p>
        <select
          name="아티스트 선택"
          value={selectedArtistId}
          onChange={(e) => setSelectedArtistId(Number(e.target.value))}
          className="text-body-01 cursor-pointer rounded-sm border font-semibold outline-none"
        >
          <option value={0} disabled />
          {data.map((item, idx) => (
            <option key={idx} value={item.profile.artistId} className="cursor-pointer">
              {item.profile.name}
            </option>
          ))}
        </select>
      </div>
      {selectedArtist && (
        <div className="mx-5 mt-10 mb-20 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {/* 아티스트 텍스트 정보 수정 */}
            {(Object.keys(form) as (keyof typeof form)[]).map((key) => (
              <React.Fragment key={key}>
                <p className="text-body-01 font-regular">
                  <strong className="font-semibold">{formKeyMap[key].title}: </strong>
                  {selectedArtist.profile[formKeyMap[key].valueKey]}
                </p>
                <TextareaAutosize
                  value={form[key]}
                  onChange={(e) => handleForm(key, e.target.value)}
                  className="text-body-01 font-regular resize-none border pl-2 outline-none"
                />
                <button onClick={() => update(key)} className="cursor-pointer">
                  <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                    <p className="text-body-01 font-semibold">변경하기</p>
                  </div>
                </button>
              </React.Fragment>
            ))}
            {/* 아티스트 이미지 정보 수정 */}
            <div className="flex flex-col">
              <p className="text-body-01 font-semibold">아티스트 프로필 이미지:</p>
              <div className="bg-green h-50 w-full">
                <ImageWithEffect
                  src={selectedArtist.profile.profileImageUrl}
                  alt={`${selectedArtist.profile.name} 아티스트의 프로필 이미지.`}
                  fill
                />
              </div>
            </div>
            <input
              name="아티스트 프로필 이미지 선택"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleProfileImage(file);
              }}
              className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold"
            />
            <button onClick={() => update('profileImageKey')} className="cursor-pointer">
              <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                <p className="text-body-01 font-semibold">변경하기</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
