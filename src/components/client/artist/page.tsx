'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import ItemList from '@/components/common/item/item-list';
import ArtistInformationSection from '@/components/features/artist/artist-information-section';
import ArtistQuestionSection from '@/components/features/artist/artist-question-section';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import LinkIcon from '@/public/icons/common/link.svg';
import type { ItemControllerParams } from '@/types/item-controller';

interface ClientArtistPageProps {
  dehydratedState: DehydratedState;
  artistId: number;
  initialParams: ItemControllerParams;
}

export default function ClientArtistPage({ dehydratedState, artistId, initialParams }: ClientArtistPageProps) {
  const ArtistBackground = dynamic(() => import('@/components/features/artist/artist-background'), { ssr: false });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        {/* 배경 */}
        <ArtistBackground artistId={artistId} />

        <div className="bg-pale-green z-5 mt-50 flex flex-col gap-20 pt-5 pb-20">
          {/* 작가 정보 */}
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
          <div className="-mt-13">
            <ItemList initialParams={initialParams} />
          </div>

          {/* 작가에게 질문 */}
          <ArtistQuestionSection artistId={artistId} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
