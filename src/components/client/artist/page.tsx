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
  artistId: Artist['artistId'];
  artistInformationState: DehydratedState;
  artistItemsState: DehydratedState;
  exhibitionsState: DehydratedState;
  initialParams: ArtistItemListParams;
}

export default function ClientArtistPage({
  artistId,
  artistInformationState,
  artistItemsState,
  exhibitionsState,
  initialParams,
}: ClientArtistPageProps) {
  const [isBookMark, setBookMark] = useState(false);

  return (
    <div className="relative flex flex-col">
      <div className="bg-green fixed top-11.5 left-1/2 h-50 w-full max-w-[var(--frame-width)] -translate-x-1/2" />
      <div className="text-grey-0 fixed top-15.5 left-1/2 flex w-full max-w-[var(--frame-width)] -translate-x-1/2 justify-end pr-3.5">
        {isBookMark ? (
          <BookMarkFilledIcon onClick={() => setBookMark((prev) => !prev)} className="cursor-pointer" />
        ) : (
          <BookMarkEmptyIcon onClick={() => setBookMark((prev) => !prev)} className="cursor-pointer" />
        )}
      </div>
      <div className="bg-pale-green z-5 mt-50 mb-20 flex flex-col gap-20 pt-5">
        <HydrationBoundary state={artistInformationState}>
          <ArtistInformationSection artistId={artistId} />
        </HydrationBoundary>
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
          <HydrationBoundary state={exhibitionsState}>
            <ExhibitionSwiper />
          </HydrationBoundary>
        </div>
        {/* 아이템 리스트 */}
        <HydrationBoundary state={artistItemsState}>
          <ItemList initialParams={initialParams} />
        </HydrationBoundary>
        {/* 작가에게 질문 */}
        <HydrationBoundary state={artistInformationState}>
          <ArtistQuestionSection artistId={artistId} />
        </HydrationBoundary>
      </div>
    </div>
  );
}
