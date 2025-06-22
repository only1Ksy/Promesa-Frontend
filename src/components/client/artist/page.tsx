'use client';

import { useState } from 'react';
import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import Link from 'next/link';

import ItemList from '@/components/common/item/item-list';
import ArtistInformationSection from '@/components/features/artist/artist-information-section';
import ArtistQuestionSection from '@/components/features/artist/artist-question-section';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import BookMarkEmptyIcon from '@/public/icons/artist/book-mark-empty.svg';
import BookMarkFilledIcon from '@/public/icons/artist/book-mark-filled.svg';
import LinkIcon from '@/public/icons/common/link.svg';
import type { Artist } from '@/services/api/artist';
import type { ArtistItemListParams } from '@/types/params.dto';

interface ClientArtistPageProps {
  dehydratedState: DehydratedState;
  artistId: Artist['artistId'];
  initialParams: ArtistItemListParams;
}

export default function ClientArtistPage({ dehydratedState, artistId, initialParams }: ClientArtistPageProps) {
  const [isBookMark, setBookMark] = useState(false);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative flex flex-col">
        <div className="fixed-component no-z-index bg-green top-11.5 h-50" />
        <div className="fixed-component no-z-index text-grey-0 top-15.5 flex justify-end pr-3.5">
          {isBookMark ? (
            <BookMarkFilledIcon onClick={() => setBookMark((prev) => !prev)} className="cursor-pointer" />
          ) : (
            <BookMarkEmptyIcon onClick={() => setBookMark((prev) => !prev)} className="cursor-pointer" />
          )}
        </div>

        <div className="bg-pale-green z-5 mt-50 flex flex-col gap-20 pt-5 pb-20">
          <ArtistInformationSection artistId={artistId} />
          {/* 기획전 */}
          <div className="flex flex-col gap-3">
            <div className="mx-5 flex items-center justify-between">
              <p className="text-subhead font-medium text-black">참여한 기획전</p>
              <Link href="/exhibitions">
                <div className="flex items-center gap-2">
                  <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
                  <LinkIcon className="text-grey-6" />
                </div>
              </Link>
            </div>
            <ExhibitionSwiper />
          </div>

          {/* 아이템 리스트 */}
          <ItemList initialParams={initialParams} />

          {/* 작가에게 질문 */}
          <ArtistQuestionSection artistId={artistId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
