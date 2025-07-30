'use client';

import { SyntheticEvent, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import Expandable from '@/components/common/utilities/expandable';
import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { fetchExhibition } from '@/services/api/exhibition-controller';

interface ExhibitionDetailProps {
  exhibitionId: number;
}

export default function ExhibitionDetail({ exhibitionId }: ExhibitionDetailProps) {
  const [open, setOpen] = useState(false);
  const [paddingTop, setPaddingTop] = useState<number>(0);

  const { data } = useSuspenseQuery({
    queryKey: ['exhibition', exhibitionId],
    queryFn: () => fetchExhibition(exhibitionId),
  });

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalHeight / img.naturalWidth;
    setPaddingTop(ratio * 100);
  };

  return (
    <div className="relative">
      <Expandable flag={open} collapsedMaxHeight={250} durationTime={2000} className="w-full">
        <div
          className="bg-pale-green relative w-full"
          style={paddingTop ? { paddingTop: `${paddingTop}%` } : { minHeight: 'calc(var(--spacing) * 250' }}
        >
          <ImageWithLoading
            src={data.detail.detailedImageUrl}
            alt={`기획전 ${data.summary.title}의 세부 이미지.`}
            fill
            priority
            onLoad={handleImageLoad}
          />
        </div>
      </Expandable>
      <div className="absolute bottom-0 z-5 flex w-full flex-col">
        {!open && (
          <div className="from-pale-green/0 to-pale-green relative h-77 w-full bg-gradient-to-b from-0% to-75% pb-13">
            <div className="absolute bottom-13 left-1/2 z-10 w-full -translate-x-1/2 px-10">
              <button
                onClick={() => setOpen(true)}
                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xs border border-[#000000]"
              >
                <p className="text-grey-9 text-body-02 font-bold">큐레이션 더보기</p>
              </button>
            </div>
          </div>
        )}
        <hr className="mx-5 border-t border-t-[#000000]/20" />
      </div>
    </div>
  );
}
