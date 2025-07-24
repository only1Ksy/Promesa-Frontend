'use client';

import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import MyPageSection from '@/components/features/my/my-page-section';
import MyProfile from '@/components/features/my/my-profile';
import MyWishList from '@/components/features/my/my-wish-list';

interface ClientMePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientMyPage({ dehydratedState }: ClientMePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-5 flex flex-col gap-7.5 pb-20">
        <MyProfile />
        <MyPageSection
          sectionTitle="나의 쇼핑 정보"
          subSectionList={[
            { subSectionTitle: '주문 내역 조회', subSectionLink: '/my' },
            { subSectionTitle: '리뷰', subSectionLink: '/my/review' },
          ]}
        />
        <MyPageSection
          sectionTitle="나의 계정 정보"
          subSectionList={[
            { subSectionTitle: '회원 정보 수정', subSectionLink: '/my' },
            { subSectionTitle: '로그아웃', subSectionLink: '/logout' },
          ]}
        />
        <div className="flex flex-col gap-5">
          <MyPageSection sectionTitle="아티스트 북마크" />
          <MyWishList targetType="ARTIST" />
        </div>
        <div className="flex flex-col gap-5">
          <MyPageSection sectionTitle="위시리스트" />
          <MyWishList targetType="ITEM" />
        </div>
      </div>
    </HydrationBoundary>
  );
}
