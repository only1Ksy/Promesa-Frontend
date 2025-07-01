'use client';

import React, { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import Expandable from '@/lib/utils/expandable';
import DropUpIcon from '@/public/icons/artist/drop-up.svg';
import PlusIcon from '@/public/icons/artist/plus.svg';
import { fetchArtist } from '@/services/api/artist-controller';
import { fetchInquiries } from '@/services/api/inquiry-controller';

interface ArtistQuestionSectionProps {
  artistId: number;
}

export default function ArtistQuestionSection({ artistId }: ArtistQuestionSectionProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtist(artistId),
  });

  const { data: inquiries } = useSuspenseQuery({
    queryKey: ['inquiries', artistId],
    queryFn: () => fetchInquiries(artistId),
  });

  const { name } = data;

  const [opens, setOpens] = useState<boolean[]>(Array(inquiries.length).fill(false));
  const [clampQs, setClampQs] = useState<boolean[]>(Array(inquiries.length).fill(false));

  const toggleOpen = (idx: number) => {
    setOpens((prev) => prev.map((val, i) => (i === idx ? !val : val)));

    if (opens[idx]) {
      setTimeout(() => {
        setClampQs((prev) => prev.map((val, i) => (i === idx ? !val : val)));
      }, 200); // strict control
    } else {
      setClampQs((prev) => prev.map((val, i) => (i === idx ? !val : val)));
    }
  };

  return (
    <section className="mx-5 flex flex-col">
      <span className="text-subhead font-medium text-black">{`${name} 작가에게 묻습니다`}</span>
      <div className="mx-1 mt-6 mb-4 flex flex-col gap-3">
        {inquiries.map(({ question, answer }, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <Expandable flag={opens[idx]} collapsedMaxHeight={6} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <p
                  className={clsx(
                    'text-body-02 text-grey-7 custom-break-words max-w-70 font-medium text-ellipsis',
                    !clampQs[idx] && 'line-clamp-1',
                  )}
                >
                  {question}
                </p>
                <button onClick={() => toggleOpen(idx)} className="cursor-pointer">
                  {opens[idx] ? <DropUpIcon className="text-grey-5" /> : <PlusIcon className="text-grey-5" />}
                </button>
              </div>
              <p className="text-caption-01 text-grey-7 custom-break-words mr-4.5 mb-3 font-medium">{answer}</p>
            </Expandable>
            <hr className="border-grey-4 w-full" />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <span className="text-caption-01 text-grey-8 border-grey-4 flex h-6 w-17.5 flex-shrink-0 items-center justify-center rounded-[20px] border-[0.75px] p-2.5 font-medium">
          질문하기
        </span>
      </div>
    </section>
  );
}
