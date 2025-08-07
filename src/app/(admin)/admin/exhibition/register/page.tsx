'use client';

import React, { useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { registerExhibition } from '@/services/api/admin/admin-exhibition-controller';
import { deleteImages, postImages } from '@/services/api/image-controller';
import { fetchShopItems } from '@/services/api/item-controller';
import { getQueryClient } from '@/services/query/client';

export default function AdminExhibitionRegisterPage() {
  const queryClient = getQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ['admin-item-list'],
    queryFn: () => fetchShopItems({ categoryId: 0, page: 0, sort: 'wishCount,desc', size: 1000 }),
  });

  const items = useMemo(() => [...data.content].sort((a, b) => a.itemName.localeCompare(b.itemName, 'ko-KR')), [data]);
  const itemIdNameMap = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc[item.itemId] = item.itemName;
        return acc;
      },
      {} as Record<number, string>,
    );
  }, [items]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    thumbnailKey: '',
    imageKeys: [] as { key: string; sortOrder: number }[],
    itemIds: [] as number[],
  });
  const [promotionImageFiles, setPromotionImageFiles] = useState<File[]>([]);
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const fileInputRefMain = useRef<HTMLInputElement>(null);
  const fileInputRefSub = useRef<HTMLInputElement>(null);

  const handleForm = (field: keyof typeof form, value: string | null) => {
    if (['imageKeys', 'itemIds'].includes(field)) return;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailImage = async (file: File) => {
    const { key: thumbnailKey, url } = (
      await postImages({
        imageType: 'EXHIBITION',
        referenceId: null,
        subType: 'THUMBNAIL',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    if (form.thumbnailKey !== '') {
      await deleteImages(form.thumbnailKey);
      setForm((prev) => ({ ...prev, thumbnailKey: '' }));
    }

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setForm((prev) => ({ ...prev, thumbnailKey }));
  };

  const handlePromotionImage = async (file: File) => {
    const { key, url } = (
      await postImages({
        imageType: 'EXHIBITION',
        referenceId: null,
        subType: 'PROMOTION',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setForm((prev) => ({ ...prev, imageKeys: [...prev.imageKeys, { key, sortOrder }] }));
    setSortOrder((prev) => prev + 1);
    setPromotionImageFiles((prev) => [...prev, file]);
  };

  const handleSelectedItem = (itemId: number) => {
    setForm((prev) => ({ ...prev, itemIds: [...prev.itemIds, itemId] }));
  };

  const removePromotionImage = async (idx: number) => {
    // same index: form.imageKeys <-> promotionImageFiles
    await deleteImages(form.imageKeys[idx].key);
    setForm((prev) => {
      const nextImageKeys = [...prev.imageKeys];
      nextImageKeys.splice(idx, 1);
      return {
        ...prev,
        imageKeys: nextImageKeys,
      };
    });
    setPromotionImageFiles((prev) => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };

  const removeSelectedItem = (itemId: number) => {
    const idx = form.itemIds.findIndex((id) => id === itemId);

    if (idx < 0) return;

    const nextItemIds = [...form.itemIds];
    nextItemIds.splice(idx, 1);

    setForm((prev) => ({ ...prev, itemIds: nextItemIds }));
  };

  const register = async () => {
    if (
      form.title === '' ||
      form.description === '' ||
      form.startDate === '' ||
      form.thumbnailKey === '' ||
      form.imageKeys === ([] as { key: string; sortOrder: number }[]) ||
      form.itemIds === ([] as number[])
    )
      return;

    await registerExhibition({
      ...form,
      endDate: form.endDate === '' ? null : form.endDate,
      imageKeys: [{ key: form.thumbnailKey, sortOrder: 1 }, ...form.imageKeys], // add thumbnailKey when POST
    });

    queryClient.refetchQueries({ queryKey: ['admin-exhibition-list'] });

    setForm({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      thumbnailKey: '',
      imageKeys: [] as { key: string; sortOrder: number }[],
      itemIds: [] as number[],
    });
    setPromotionImageFiles([]);
    setSortOrder(1);
    setSelectedItemId(0);
  };

  const formKeyMap: {
    [K in keyof typeof form]: {
      title: string;
    };
  } = {
    title: {
      title: '1️⃣ 기획전 제목',
    },
    description: {
      title: '2️⃣ 기획전 설명',
    },
    startDate: {
      title: '3️⃣ 기획전 시작 날짜',
    },
    endDate: {
      title: '4️⃣ 기획전 종료 날짜',
    },
    thumbnailKey: {
      title: '5️⃣ 기획전 썸네일 이미지',
    },
    imageKeys: {
      title: '6️⃣ 기획전 프로모션 이미지 목록',
    },
    itemIds: {
      title: '7️⃣ 기획전 작품 목록',
    },
  } as const;

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 flex flex-col pl-5">
        <p className="text-headline-04">기획전 등록하기</p>
        <Link href="/admin/exhibition">
          <p className="text-orange text-headline-04">뒤로가기</p>
        </Link>
      </div>
      <div className="mx-5 mt-10 mb-20 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {/* 기획전 텍스트 정보 입력 */}
          {(['title', 'description'] as const).map((key) => (
            <React.Fragment key={key}>
              <p className="text-body-01 font-semibold">{formKeyMap[key].title}</p>
              <TextareaAutosize
                name={formKeyMap[key].title}
                value={form[key]}
                onChange={(e) => handleForm(key, e.target.value)}
                className="border-deep-green text-body-01 resize-none rounded-sm border px-2 py-1 font-semibold outline-none"
              />
            </React.Fragment>
          ))}
          {/* 기획전 날짜 정보 입력 */}
          {(['startDate', 'endDate'] as const).map((key) => (
            <React.Fragment key={key}>
              <div className="flex justify-between gap-5">
                <p className="text-body-01 font-semibold">{formKeyMap[key].title}</p>
                {key === 'endDate' && (
                  <button onClick={() => handleForm('endDate', '')}>
                    <div className="hover:bg-orange text-orange border-orange cursor-pointer overflow-hidden rounded-sm border px-1 hover:text-white">
                      <p className="text-body-01 font-semibold">날짜 초기화</p>
                    </div>
                  </button>
                )}
              </div>
              <input
                name={formKeyMap[key].title}
                type="date"
                value={form[key]}
                onChange={(e) => handleForm(key, e.target.value)}
                className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
              />
            </React.Fragment>
          ))}
          {/* 기획전 이미지 정보 입력 */}
          <div className="flex flex-col gap-2">
            <p className="text-body-01 font-semibold">5️⃣ 기획전 썸네일 이미지</p>
            <p className="text-body-02 font-regular text-orange italic">* width: 402px, height: 456px</p>
          </div>
          <input
            name="5️⃣ 기획전 썸네일 이미지"
            ref={fileInputRefMain}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleThumbnailImage(file);
            }}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          />
          {/* 기획전 프로모션 이미지 목록 */}
          <p className="text-body-01 font-semibold">6️⃣ 기획전 프로모션 이미지 목록</p>
          {promotionImageFiles.map((file, idx) => (
            <div key={`${file.name}-${idx}`} className="flex justify-between">
              <p className="text-body-02 font-regular">📷 {file.name}</p>
              <button onClick={() => removePromotionImage(idx)} className="cursor-pointer">
                <p className="hover:text-orange text-body-02 font-bold">X</p>
              </button>
            </div>
          ))}
          <input
            key={promotionImageFiles.length}
            name="6️⃣ 기획전 프로모션 이미지 목록"
            ref={fileInputRefSub}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePromotionImage(file);
            }}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          />
          {/* 기획전 작품 정보 입력 */}
          <p className="text-body-01 font-semibold">7️⃣ 기획전 작품 목록</p>
          {form.itemIds.map((itemId) => (
            <div key={itemId} className="flex justify-between">
              <p className="text-body-02 font-regular">🍶 {itemIdNameMap[itemId]}</p>
              <button onClick={() => removeSelectedItem(itemId)} className="cursor-pointer">
                <p className="hover:text-orange text-body-02 font-bold">X</p>
              </button>
            </div>
          ))}
          <select
            name="기획전 작품 선택"
            value={selectedItemId}
            onChange={(e) => {
              setSelectedItemId(Number(e.target.value));
              handleSelectedItem(Number(e.target.value));
            }}
            className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
          >
            <option value={0} disabled />
            {items.map((item) => (
              <option key={item.itemId} value={item.itemId} className="cursor-pointer">
                {item.itemName}
              </option>
            ))}
          </select>
          {/* 기획전 등록 */}
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
