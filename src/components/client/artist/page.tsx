'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ItemList from '@/components/common/item/item-list';
import ArtistBackground from '@/components/features/artist/artist-background';
import ArtistInformationSection from '@/components/features/artist/artist-information-section';
import ArtistQuestionSection from '@/components/features/artist/artist-question-section';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import type { ItemControllerParams } from '@/types/item-controller';

interface ClientArtistPageProps {
  dehydratedState: DehydratedState;
  artistId: number;
  initialParams: ItemControllerParams;
}

export default function ClientArtistPage({ dehydratedState, artistId, initialParams }: ClientArtistPageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        {/* 배경 */}
        <ArtistBackground artistId={artistId} />

        <div className="bg-pale-green z-5 mt-50 flex flex-col gap-20 pt-5 pb-20">
          {/* 작가 정보 */}
          <ArtistInformationSection artistId={artistId} />

          {/* 기획전 */}
          <ExhibitionSwiper title="참여한 기획전" page="ARTIST" artistId={artistId} />

          {/* 아이템 리스트 */}
          <div className="-mt-27">
            <ItemList initialParams={initialParams} page="ARTIST" />
          </div>

          {/* 작가에게 질문 */}
          <ArtistQuestionSection artistId={artistId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
