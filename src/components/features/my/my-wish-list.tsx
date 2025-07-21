'use client';

import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import GoToFullListIcon from '@/public/icons/my/go-to-full-list.svg';
import { fetchWishList } from '@/services/api/wish-controller';
import type { TargetSchema } from '@/types/wish-controller';

interface MyWishListProps {
  targetType: TargetSchema['targetType'];
}

export default function MyWishList({ targetType }: MyWishListProps) {
  const { data } = useSuspenseQuery({
    queryKey: [targetType === 'ARTIST' ? 'artistWishList' : 'itemWishList', targetType],
    queryFn: () => fetchWishList(targetType),
  });

  const displayData = useMemo(
    () => [
      { src: data[0]?.thumbnailUrl ?? null, isEnd: false },
      { src: data[1]?.thumbnailUrl ?? null, isEnd: false },
      { src: data[2]?.thumbnailUrl ?? null, isEnd: true },
    ],
    [data],
  );

  return (
    <div className="flex gap-2">
      {displayData.length > 0 ? (
        displayData.map(({ src, isEnd }, idx) =>
          src ? (
            <div key={idx} className="bg-green relative aspect-square flex-1 overflow-hidden rounded-xs">
              <ImageWithEffect src={src} alt={`아이템 ${data[idx].title} 이미지.`} fill />
              {isEnd && (
                <div className="text-grey-1 text-body-02 absolute inset-0 z-5 flex h-full w-full flex-col items-center justify-center bg-[#000000]/50 font-medium">
                  <p>{targetType === 'ARTIST' ? '북마크' : '위시'}</p>
                  <div className="flex items-center gap-1.5">
                    <p>전체 보기</p>
                    <GoToFullListIcon />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div key={idx} className="aspect-square flex-1 bg-transparent"></div>
          ),
        )
      ) : (
        <>
          <div className="text-grey-1 text-body-02 aspect-square flex-1 items-center justify-center rounded-xs bg-[#000000]/50 text-center font-medium">
            <p>NO LIST</p>
          </div>
          <div className="aspect-square flex-1 bg-transparent" />
          <div className="aspect-square flex-1 bg-transparent" />
        </>
      )}
    </div>
  );
}
