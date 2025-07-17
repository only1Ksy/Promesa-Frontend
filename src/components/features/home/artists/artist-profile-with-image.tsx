import React from 'react';
import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useToggleWish } from '@/hooks/use-toggle-wish';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';
import type { ArtistResponseSchema } from '@/types/artist-controller';

interface ArtistProfileWithImageProps {
  artistProfileWithSection: ArtistResponseSchema & { section: string };
}

export default function ArtistProfileWithImage({ artistProfileWithSection }: ArtistProfileWithImageProps) {
  const { profile, wish } = artistProfileWithSection;
  const { artistId, name, profileImageUrl } = profile;
  const { isWishlisted, wishCount } = wish;

  const { mutate: toggleWish } = useToggleWish({ queryKeyList: [['artistList']] });

  return (
    <Link href={`/artist/${artistId}`}>
      <div className="bg-green relative h-40 w-full overflow-hidden rounded-lg">
        <ImageWithEffect src={profileImageUrl} alt={`프로메사 ${name} 작가 페이지의 배경 이미지.`} fill priority />
        <div className="absolute bottom-0 flex w-full items-center justify-between px-4.5 py-3.5">
          <div className="absolute inset-0 -bottom-5.5 z-5 w-full bg-gradient-to-t from-[#000000] via-[#111111]/50 via-85% to-[#222222]/0" />
          <div className="z-10 flex flex-col">
            <p className="text-body-01 font-bold text-white">{name}</p>
            <p className="text-body-02 text-grey-4 font-medium">{name}</p>
          </div>
          <div className="z-10 flex flex-col items-center text-white">
            {wishCount >= 0 ? (
              <>
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWish({ targetType: 'ARTIST', targetId: artistId, currentWished: isWishlisted });
                  }}
                  className="flex cursor-pointer items-center justify-center"
                >
                  {isWishlisted ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
                </button>
                <p className="text-caption-02 font-medium">{wishCount}</p>
              </>
            ) : (
              <button
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWish({ targetType: 'ARTIST', targetId: artistId, currentWished: isWishlisted });
                }}
                className="flex cursor-pointer items-center justify-center"
              >
                {isWishlisted ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
