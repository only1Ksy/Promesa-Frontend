'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import EmptyCard from '@/components/common/empty/empty-card';
import { fetchWishList } from '@/services/api/wish-controller';

export default function WishListWithPaginationComponent() {
  const { data } = useSuspenseQuery({ queryKey: ['itemWishList', 'ITEM'], queryFn: () => fetchWishList('ITEM') });

  return data.length === 0 ? (
    <div className="relative flex min-h-[calc(100vh-var(--spacing)*11.5)]">
      <EmptyCard
        main="좋아요한 작품이 없습니다"
        sub="마음에 드는 작품의 하트를 눌러보세요"
        buttonText="하트 누르러 가기"
      />
    </div>
  ) : (
    <div className="flex flex-col gap-7">
      {data.map((item) => (
        <p key={item.targetId} className="text-body-01 text-grey-9 font-medium">
          {item.title}
        </p>
      ))}
    </div>
  );
}
