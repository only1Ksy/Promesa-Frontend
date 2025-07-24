'use client';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import HorizontalScroll from '@/components/common/utilities/horizontal-scroll';
import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import LinkIcon from '@/public/icons/common/link.svg';
import { fetchArtistExhibitions } from '@/services/api/artist-controller';
import { fetchOngoingExhibitions } from '@/services/api/exhibition-controller';

interface ExhibitionSwiperProps {
  title: string;
  page: 'HOME' | 'ARTIST';
  artistId?: number;
}

export default function ExhibitionSwiper({ title, page, artistId }: ExhibitionSwiperProps) {
  const { data } = useSuspenseQuery({
    queryKey: page === 'HOME' ? ['onGoingExhibitions'] : ['exhibitions', artistId],
    queryFn: page === 'HOME' ? fetchOngoingExhibitions : () => fetchArtistExhibitions(artistId!),
  });

  if (data.length === 0) return null;

  return (
    <div className="mb-20 flex flex-col gap-3">
      <div className="mx-5 flex items-center justify-between">
        <p className="text-subhead font-medium text-black">{title}</p>
        <Link href="/home/exhibitions">
          <div className="flex items-center gap-2">
            <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
            <LinkIcon className="text-grey-6" />
          </div>
        </Link>
      </div>
      <HorizontalScroll className="ml-5 flex gap-2 pr-5">
        {data.map((item, idx) => (
          <div key={idx} className="bg-green relative flex h-77 w-68 flex-shrink-0 items-end p-7">
            <ImageWithLoading src={item.imageUrl} alt={`프로메사 ${idx + 1}번째 전시회 대표 이미지.`} fill />
            <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-3/10 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]" />
            <div className="z-10 flex flex-col gap-1">
              <p className="text-subhead text-grey-1 font-bold">{item.title}</p>
              <p className="text-caption-01 text-grey-2 font-medium">{item.description}</p>
            </div>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
