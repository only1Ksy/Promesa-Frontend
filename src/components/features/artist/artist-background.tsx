'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useToggleWish } from '@/hooks/use-toggle-wish';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';
import { fetchArtist } from '@/services/api/artist-controller';

interface ArtistBackgroundDivProps {
  artistId: number;
}

export default function ArtistBackground({ artistId }: ArtistBackgroundDivProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtist(artistId),
  });

  const { mutate: toggleWish } = useToggleWish();

  const { profile, wish } = data;

  const { name, profileImageUrl } = profile;
  const { isWishlisted, wishCount } = wish;

  return (
    <div className="fixed-component no-z-index top-11.5 h-50 w-full">
      <ImageWithEffect src={profileImageUrl} alt={`프로메사 ${name} 작가 페이지의 배경 이미지.`} fill priority />
      <button
        onClick={
          wishCount >= 0
            ? () => toggleWish({ targetType: 'ARTIST', targetId: artistId, currentWished: isWishlisted })
            : undefined
        }
        className={clsx('text-grey-0 absolute top-4 right-3.5 z-10', wishCount >= 0 && 'cursor-pointer')}
      >
        {isWishlisted ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
      </button>
    </div>
  );
}
