'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
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

  const { name, profileImageUrl, isWishlisted } = data;

  return (
    <div className="fixed-component no-z-index top-11.5 h-50 w-full">
      <ImageWithEffect src={profileImageUrl} alt={`프로메사 ${name} 작가 페이지의 배경 이미지.`} fill priority />
      <div className="text-grey-0 absolute top-4 right-3.5 z-10">
        {isWishlisted ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
      </div>
    </div>
  );
}
