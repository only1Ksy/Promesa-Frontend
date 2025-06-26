import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import BookmarkEmpty from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilled from '@/public/icons/artist/bookmark-filled.svg';
import RightSingle from '@/public/icons/item/page-right-single.svg';

interface ArtistPageButtonProps {
  artistId: number;
}

export default function ArtistPageButton({ artistId }: ArtistPageButtonProps) {
  const [isBookmark, setBookmark] = useState(false);

  return (
    <div className="relative z-10 flex h-19 w-full flex-col items-start gap-2.5 px-5">
      <Link href={`/artist/${artistId}`} className="block w-full">
        <div className="bg-deep-green relative flex h-19 w-full items-center px-5">
          <Image alt="..." src={''} fill />
          <div className="absolute left-5 z-10 flex flex-col text-white">
            <div className="flex items-center">
              <span className="text-body-01 font-medium">박아름</span>
              <RightSingle className="text-white" />
            </div>
            <span className="text-grey-3 text-caption-01 font-medium">Artist</span>
          </div>
        </div>
      </Link>

      <div className="absolute top-1/2 right-10 z-20 flex -translate-y-1/2 flex-col items-center">
        {isBookmark ? (
          <BookmarkFilled onClick={() => setBookmark((prev) => !prev)} className="text-grey-0 cursor-pointer" />
        ) : (
          <BookmarkEmpty onClick={() => setBookmark((prev) => !prev)} className="text-grey-0 cursor-pointer" />
        )}
        <span className="text-grey-0 text-caption-02 font-medium">28</span>
      </div>
    </div>
  );
}
