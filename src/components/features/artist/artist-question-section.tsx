'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { QA_LIST } from '@/lib/constants/qa-list';
import DropUpIcon from '@/public/icons/artist/drop-up.svg';
import PlusIcon from '@/public/icons/artist/plus.svg';
import type { Artist } from '@/services/api/artist';
import { fetchArtistInformation } from '@/services/api/artist';

interface ArtistQuestionSectionProps {
  artistId: Artist['artistId'];
}

export default function ArtistQuestionSection({ artistId }: ArtistQuestionSectionProps) {
  const [open, setOpen] = useState<boolean[]>(Array(QA_LIST.length).fill(false));

  const { data: information, isLoading } = useQuery({
    queryKey: ['artistInformation', artistId],
    queryFn: () => fetchArtistInformation(artistId),
    select: (res) => res.data,
  });

  if (!information) return null;

  if (isLoading) return null;

  const { artistName } = information;

  const toggleOpen = (idx: number) => {
    setOpen((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  return (
    <div className="mx-5 flex flex-col">
      <div className="text-subhead font-medium text-black">{`${artistName} 작가에게 묻습니다`}</div>
      <div className="mt-6 mb-4 flex flex-col gap-3">
        {QA_LIST.map(({ question, answer }, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-start justify-between">
              <span
                className={clsx(
                  'text-body-02 text-grey-7 custom-break-words max-w-65 font-medium',
                  open[idx] ? '' : 'line-clamp-1 overflow-hidden text-ellipsis',
                )}
              >
                {question}
              </span>
              <button onClick={() => toggleOpen(idx)} className="cursor-pointer">
                {open[idx] ? <DropUpIcon className="text-grey-5" /> : <PlusIcon className="text-grey-5" />}
              </button>
            </div>
            {open[idx] && (
              <span className="text-caption-01 text-grey-7 custom-break-words max-w-84 font-medium">{answer}</span>
            )}
            <hr className="border-grey-4 w-full" />
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="text-caption-01 text-grey-8 border-grey-4 flex h-6 w-17.5 flex-shrink-0 items-center justify-center rounded-[20px] border-[0.75px] p-2.5 font-medium">
          질문하기
        </div>
      </div>
    </div>
  );
}
