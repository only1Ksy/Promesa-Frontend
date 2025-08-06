'use client';

import { useEffect, useMemo, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSuspenseQuery } from '@tanstack/react-query';

import { deleteInquiry, editInquiry, postNewInquiry } from '@/services/api/admin/admin-inquiry-controller';
import { fetchArtistList } from '@/services/api/artist-controller';
import { fetchInquiries } from '@/services/api/inquiry-controller';
import type { InquiryResponseSchema } from '@/types/inquiry-controller';

export default function AdminInquiryPage() {
  const { data } = useSuspenseQuery({
    queryKey: ['admin-artist-list'],
    queryFn: fetchArtistList,
  });

  const [selectedArtistId, setSelectedArtistId] = useState<number>(0);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number>(0);
  const [inquiryList, setInquiryList] = useState<InquiryResponseSchema[] | null>(null);
  const [form, setForm] = useState({
    question: '',
    answer: '',
  });

  const selectedArtist = useMemo(
    () => data.find((item) => item.profile.artistId === selectedArtistId),
    [selectedArtistId, data],
  );

  useEffect(() => {
    if (selectedArtistId === 0) return;

    const fetchAndSet = async () => {
      const fetchedInquiryList = await fetchInquiries(selectedArtistId);
      setInquiryList(fetchedInquiryList);
      setSelectedInquiryId(0);
    };

    fetchAndSet();
  }, [selectedArtistId]);

  useEffect(() => {
    if (!inquiryList) return;

    const cur = inquiryList.find((item) => item.inquiryId === selectedInquiryId);

    setForm({
      question: cur?.question ?? '',
      answer: cur?.answer ?? '',
    });
  }, [selectedInquiryId, inquiryList]);

  const handleForm = (field: keyof typeof form, value: string | null) => {
    console.log(field, value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const register = async () => {
    await postNewInquiry({ ...form, artistId: selectedArtistId });

    const fetchedInquiryList = await fetchInquiries(selectedArtistId);
    setInquiryList(fetchedInquiryList);
  };

  const update = async () => {
    await editInquiry(selectedInquiryId, form);

    const fetchedInquiryList = await fetchInquiries(selectedArtistId);
    setInquiryList(fetchedInquiryList);
  };

  const del = async (inquiryId: number) => {
    await deleteInquiry(inquiryId);

    const fetchedInquiryList = await fetchInquiries(selectedArtistId);
    setInquiryList(fetchedInquiryList);
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="mb-5 pl-5">
        <p className="text-headline-04">문의 등록/수정/삭제</p>
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
        <div className="mx-5 mt-10 mb-20 flex flex-col gap-10">
          {/* 문의 정보 수정 */}
          <div className="flex flex-col gap-2">
            <p className="text-body-01 font-semibold">1️⃣ 문의 ID</p>
            <p className="text-body-02 font-regular text-orange italic">* 0으로 설정할 경우 문의 등록</p>
            <input
              name="문의 ID"
              type="number"
              value={selectedInquiryId}
              min={0}
              onChange={(e) => setSelectedInquiryId(Number(e.target.value))}
              className="border-deep-green text-body-01 rounded-sm border px-2 py-1 font-semibold outline-none"
            />
            <p className="text-body-01 font-semibold">2️⃣ 문의 질문</p>
            <TextareaAutosize
              name="문의 질문"
              value={form.question}
              onChange={(e) => handleForm('question', e.target.value)}
              className="border-deep-green text-body-01 resize-none rounded-sm border px-2 py-1 font-semibold outline-none"
            />
            <p className="text-body-01 font-semibold">3️⃣ 문의 답변</p>
            <TextareaAutosize
              name="문의 답변"
              value={form.answer}
              onChange={(e) => handleForm('answer', e.target.value)}
              className="border-deep-green text-body-01 resize-none rounded-sm border px-2 py-1 font-semibold outline-none"
            />
            <button onClick={selectedInquiryId === 0 ? register : update} className="cursor-pointer">
              <div className="border-deep-green rounded-sm border px-2 py-1 hover:bg-black hover:text-white">
                <p className="text-body-01 font-semibold">{selectedInquiryId === 0 ? '등록하기' : '수정하기'}</p>
              </div>
            </button>
          </div>
          {/* 문의 목록 */}
          <div className="flex flex-col gap-2">
            {inquiryList?.map((item) => (
              <div key={item.inquiryId} className="flex flex-col rounded-lg border p-2">
                <p className="text-body-01 font-bold">ID {item.inquiryId}</p>
                <p className="text-body-02 font-regular">❓ {item.question}</p>
                <p className="text-body-02 font-regular">🗣️ {item.answer}</p>
                <button onClick={() => del(item.inquiryId)} className="mt-3 flex cursor-pointer justify-end">
                  <div className="hover:bg-orange text-orange border-orange w-20 items-center justify-center rounded-sm border hover:text-white">
                    <p className="text-body-01 font-semibold">삭제하기</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
