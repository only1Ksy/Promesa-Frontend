'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useToggleWish } from '@/hooks/use-toggle-wish';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';
import RightSingleIcon from '@/public/icons/item/page-right-single.svg';
import { DetailArtistResponseSchema } from '@/types/item-controller';

interface ArtistPageButtonProps {
  artist: DetailArtistResponseSchema;
}

export default function ArtistPageButton({ artist }: ArtistPageButtonProps) {
  const { mutate: toggleWish } = useToggleWish();

  return (
    <div className="relative z-10 flex h-19 w-full flex-col items-start gap-2.5 px-5">
      <Link href={`/artist/${artist.id}`} className="block w-full">
        <div className="bg-deep-green relative flex h-19 w-full items-center px-5">
          <Image alt="artist background" src={artist.profileImageUrl} fill unoptimized className="z-0 object-cover" />

          <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent to-black/90" />

          <div className="relative z-10 flex flex-col text-white">
            <div className="flex items-center">
              <span className="text-body-01 font-medium">{artist.name}</span>
              <RightSingleIcon className="text-white" />
            </div>
            <span className="text-grey-3 text-caption-01 font-medium">Artist</span>
          </div>
        </div>
      </Link>

      <div className="absolute top-1/2 right-10 z-20 flex -translate-y-1/2 flex-col items-center">
        <button
          onClick={() => toggleWish({ targetType: 'ARTIST', targetId: artist.id, currentWished: artist.isWishlisted })}
          className="text-grey-0 cursor-pointer"
        >
          {artist.isWishlisted ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
        </button>
        <span className="text-grey-0 text-caption-02 font-medium">{artist.wishCount}</span>
      </div>
    </div>
  );
}
