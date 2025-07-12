import Link from 'next/link';

// import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';

interface ListWithImageProps {
  artistId: number;
  koName: string;
  enName: string;
  src: string;
  isWishListed: boolean;
  wishCount: number;
  toggleWish: (artistId: number) => void;
}

export default function ListWithImage({
  artistId,
  koName,
  enName,
  src,
  isWishListed,
  wishCount,
  toggleWish,
}: ListWithImageProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="bg-green relative flex h-40 w-full flex-col justify-end overflow-hidden rounded-lg">
        <Link href={`/artist/${artistId}`} className="absolute inset-0 z-2 h-full w-full" />
        {/* mock image */}
        <img
          src={src}
          alt={`프로메사 ${koName} 작가 페이지의 배경 이미지.`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-5 flex items-center justify-between px-4.5 py-3.5">
          <div className="absolute inset-0 -bottom-5.5 w-full bg-gradient-to-t from-[#000000] via-[#111111]/50 via-85% to-[#222222]/0" />
          <div className="z-10 flex flex-col">
            <p className="text-body-01 font-bold text-white">{koName}</p>
            <p className="text-body-02 text-grey-4 font-medium">{enName}</p>
          </div>
          <div className="z-10 flex flex-col items-center text-white">
            <button onClick={() => toggleWish(artistId)} className="flex cursor-pointer items-center justify-center">
              {isWishListed ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
            </button>
            <p className="text-caption-02 font-medium">{wishCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
