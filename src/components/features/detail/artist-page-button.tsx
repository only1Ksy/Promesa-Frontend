import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';
import RightSingleIcon from '@/public/icons/item/page-right-single.svg';
import { fetchItemDetail } from '@/services/api/item-controller';

interface ArtistPageButtonProps {
  itemId: number;
}

export default function ArtistPageButton({ itemId }: ArtistPageButtonProps) {
  const [isBookmark, setBookmark] = useState(false);

  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res,
  });

  useEffect(() => {
    if (item) {
      setBookmark(item.artist.isWishlisted);
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="relative z-10 flex h-19 w-full flex-col items-start gap-2.5 px-5">
      <Link href={`/artist/${item?.artist.id}`} className="block w-full">
        <div className="bg-deep-green relative flex h-19 w-full items-center px-5">
          <Image alt="artist background" src={item.artist.profileImageUrl} fill className="z-0 object-cover" />
          <div className="relative z-10 flex flex-col text-white">
            <div className="flex items-center">
              <span className="text-body-01 font-medium">{item.artist.name}</span>
              <RightSingleIcon className="text-white" />
            </div>
            <span className="text-grey-3 text-caption-01 font-medium">Artist</span>
          </div>
        </div>
      </Link>

      <div className="absolute top-1/2 right-10 z-20 flex -translate-y-1/2 flex-col items-center">
        {isBookmark ? (
          <button onClick={() => setBookmark((prev) => !prev)}>
            <BookmarkFilledIcon className="text-grey-0 cursor-pointer" />
          </button>
        ) : (
          <button onClick={() => setBookmark((prev) => !prev)}>
            <BookmarkEmptyIcon className="text-grey-0 cursor-pointer" />
          </button>
        )}
        <span className="text-grey-0 text-caption-02 font-medium">28</span>
      </div>
    </div>
  );
}
