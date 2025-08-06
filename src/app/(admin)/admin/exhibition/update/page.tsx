'use client';

import type { SyntheticEvent } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { updateExhibition } from '@/services/api/admin/admin-exhibition-controller';
import { fetchExhibition, fetchExhibitions } from '@/services/api/exhibition-controller';
import { postImages } from '@/services/api/image-controller';
import { fetchShopItems } from '@/services/api/item-controller';
import { getQueryClient } from '@/services/query/client';
import type { ExhibitionDetailResponseSchema, ExhibitionSummarySchema } from '@/types/exhibition-controller';

export default function AdminExhibitionUpdatePage() {
  const queryClient = getQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: ['admin-exhibition-list'],
    queryFn: () => fetchExhibitions('ALL'),
  });

  const { data: rawItems } = useSuspenseQuery({
    queryKey: ['admin-item-list'],
    queryFn: () => fetchShopItems({ categoryId: 0, page: 0, sort: 'wishCount,desc', size: 1000 }),
  });

  const items = useMemo(
    () => [...rawItems.content].sort((a, b) => a.itemName.localeCompare(b.itemName, 'ko-KR')),
    [rawItems],
  );
  const itemIdNameMap = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc[item.itemId] = item.itemName;
        return acc;
      },
      {} as Record<number, string>,
    );
  }, [items]);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<number>(0);
  const [selectedExhibition, setSelectedExhibition] = useState<ExhibitionDetailResponseSchema | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    itemIds: [] as number[],
  });
  const [ratios, setRatios] = useState<number[]>([]);
  const [thumbnailKey, setThumbnailKey] = useState<string>('');
  const [imageKeys, setImageKeys] = useState<{ key: string; sortOrder: number }[]>([]);
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  useEffect(() => {
    if (!selectedExhibitionId) return;

    const fetchAndSet = async () => {
      const data = await fetchExhibition(selectedExhibitionId);
      setSelectedExhibition(data);
    };

    fetchAndSet();
  }, [selectedExhibitionId]);

  useEffect(() => {
    if (selectedExhibition) {
      setForm({
        title: selectedExhibition.summary.title,
        description: selectedExhibition.summary.description,
        startDate: selectedExhibition.summary.startDate,
        endDate: selectedExhibition.summary.endDate ?? '',
        itemIds: selectedExhibition.itemPreviews.map((item) => item.itemId),
      });

      const maxSortOrder = Math.max(...selectedExhibition.detail.images.map((item) => item.sortOrder));
      setSortOrder(maxSortOrder + 1);
    }
  }, [selectedExhibition]);

  const handleForm = (field: keyof typeof form, value: string | null) => {
    if (['itemIds'].includes(field)) return;

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageLoad = (index: number, e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalHeight / img.naturalWidth;
    setRatios((prev) => {
      const copy = [...prev];
      copy[index] = ratio;
      return copy;
    });
  };

  const handleThumbnailImage = async (file: File) => {
    const { key, url } = (
      await postImages({
        imageType: 'EXHIBITION',
        referenceId: selectedExhibitionId,
        subType: 'THUMBNAIL',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setThumbnailKey(key);
  };

  const handlePromotionImage = async (file: File) => {
    const { key, url } = (
      await postImages({
        imageType: 'EXHIBITION',
        referenceId: selectedExhibitionId,
        subType: 'PROMOTION',
        subReferenceId: null,
        fileNames: [file.name],
      })
    )[0];

    await fetch(url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });

    setImageKeys((prev) => [...prev, { key, sortOrder }]);
    setSortOrder((prev) => prev + 1);
  };

  const handleSelectedItem = (itemId: number) => {
    setForm((prev) => ({ ...prev, itemIds: [...prev.itemIds, itemId] }));
  };

  const removePromotionImage = (idx: number) => {
    setImageKeys((prev) => {
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

  const update = async (field: keyof typeof form | 'thumbnailKey' | 'imageKeys') => {
    if (field === 'thumbnailKey') {
      await updateExhibition(selectedExhibitionId, { thumbnailKey });
    } else if (field === 'imageKeys') {
      await updateExhibition(selectedExhibitionId, { imageKeys });
    } else {
      const updatedValue = form[field] === '' && field === 'endDate' ? null : form[field];
      await updateExhibition(selectedExhibitionId, { [field]: updatedValue });
    }

    queryClient.refetchQueries({ queryKey: ['admin-exhibition-list'] });
  };

  const formKeyMap: {
    [K in keyof typeof form]: {
      title: string;
      valueKey: keyof ExhibitionSummarySchema;
    };
  } = {
    title: {
      title: '🔎 기획전 제목',
      valueKey: 'title',
    },
    description: {
      title: '🔎 기획전 설명',
      valueKey: 'description',
    },
    startDate: {
      title: '🔎 기획전 시작 날짜',
      valueKey: 'startDate',
    },
    endDate: {
      title: '🔎 기획전 종료 날짜',
      valueKey: 'endDate',
    },
    itemIds: {
      title: '🔎 기획전 작품 목록',
      valueKey: 'id', // never use
    },
  } as const;

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 flex flex-col pl-5">
        <p className="text-headline-04">기획전 수정하기</p>
        <Link href="/admin/exhibition">
          <p className="text-orange text-headline-04">뒤로가기</p>
        </Link>
      </div>
      {/* 기획전 선택 */}
      <div className="flex flex-col items-center justify-center">
        <p className="text-body-01 font-bold">기획전을 선택하세요</p>
        <select
          name="기획전 선택"
          value={selectedExhibitionId}
          onChange={(e) => setSelectedExhibitionId(Number(e.target.value))}
          className="text-body-01 cursor-pointer rounded-sm border font-semibold outline-none"
        >
          <option value={0} disabled />
          {data.map((item) => (
            <option key={item.summary.id} value={item.summary.id} className="cursor-pointer">
              {item.summary.title}
            </option>
          ))}
        </select>
      </div>
      {selectedExhibition && (
        <div className="mx-5 mt-10 mb-20 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {/* 기획전 텍스트 정보 수정 */}
            {(['title', 'description'] as const).map((key) => (
              <React.Fragment key={`${selectedExhibitionId}-${key}`}>
                <p className="text-body-01 font-regular">
                  <strong className="font-semibold">{formKeyMap[key].title}: </strong>
                  {selectedExhibition.summary[formKeyMap[key].valueKey]}
                </p>
                <TextareaAutosize
                  value={form[key]}
                  onChange={(e) => handleForm(key, e.target.value)}
                  className="text-body-01 font-regular border-deep-green resize-none rounded-sm border px-2 py-1 outline-none"
                />
                <button onClick={() => update(key)} className="cursor-pointer">
                  <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                    <p className="text-body-01 font-semibold">수정하기</p>
                  </div>
                </button>
              </React.Fragment>
            ))}
            {/* 기획전 날짜 정보 수정 */}
            {(['startDate', 'endDate'] as const).map((key) => (
              <React.Fragment key={key}>
                <div className="flex justify-between gap-5">
                  <p className="text-body-01 font-regular">
                    <strong className="font-semibold">{formKeyMap[key].title}: </strong>
                    {selectedExhibition.summary[formKeyMap[key].valueKey]}
                  </p>
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
                <button onClick={() => update(key)} className="cursor-pointer">
                  <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                    <p className="text-body-01 font-semibold">수정하기</p>
                  </div>
                </button>
              </React.Fragment>
            ))}
            {/* 기획전 이미지 정보 수정 */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-body-01 font-semibold">🔎 기획전 썸네일 이미지:</p>
                <p className="text-body-02 font-regular text-orange italic">* width: 402px, height: 456px</p>
              </div>
              <div className="bg-green h-114 w-full">
                <ImageWithEffect
                  src={selectedExhibition.summary.thumbnailImageUrl}
                  alt={`${selectedExhibition.summary.title} 기획전의 썸네일 이미지.`}
                  fill
                />
              </div>
            </div>
            <input
              name="기획전 썸네일 이미지 선택"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleThumbnailImage(file);
              }}
              className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
            />
            <button onClick={() => update('thumbnailKey')} className="cursor-pointer">
              <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                <p className="text-body-01 font-semibold">수정하기</p>
              </div>
            </button>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <p className="text-body-01 font-semibold">🔎 기획전 프로모션 이미지 목록:</p>
                <p className="text-body-02 font-regular text-orange italic">
                  * 상하단 검은 선은 시각적 구분용, 이미지 비포함
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {selectedExhibition.detail.images.map((item, idx) => (
                  <React.Fragment key={item.sortOrder}>
                    <div
                      key={item.sortOrder}
                      className="relative w-full border-y"
                      style={{
                        paddingTop: `${ratios[idx] * 100}%`,
                      }}
                    >
                      <ImageWithLoading
                        src={item.detailedImageUrl}
                        alt={`기획전 ${selectedExhibition.summary.title}의 세부 이미지.`}
                        fill
                        onLoad={(e) => handleImageLoad(idx, e)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        removePromotionImage(idx);
                        update('imageKeys');
                      }}
                      className="cursor-pointer"
                    >
                      <div className="border-orange hover:bg-orange text-orange rounded-sm border px-2 py-1 hover:text-white">
                        <p className="text-body-01 font-semibold">{`${idx + 1}번째 이미지 삭제하기`}</p>
                      </div>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <input
              name="기획전 프로모션 이미지 선택"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePromotionImage(file);
              }}
              className="border-deep-green text-body-01 cursor-pointer rounded-sm border px-2 py-1 font-semibold outline-none"
            />
            {/* 기획전 작품 정보 입력 */}
            <p className="text-body-01 font-semibold">🔎 기획전 작품 목록</p>
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
            {/* 기획전 수정 */}
            <button onClick={() => update('imageKeys')} className="cursor-pointer">
              <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                <p className="text-body-01 font-semibold">수정하기</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
