import Image from 'next/image';

import RightSingle from '@/public/icons/item/page-right-single.svg';
import BookMarkFilled from '@/public/icons/artist/book-mark-filled.svg';

export default function ArtistPageButton() {
  return (
    <div className="relative flex h-19 w-full flex-col items-start gap-[10px] px-5">
      <div className="bg-deep-green h-full w-full">
        <Image alt="product detail page artist image" src={''} />
      </div>
      <div className="absolute flex h-19 w-90.5 items-center justify-between self-stretch px-5">
        <div className="flex items-start gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-body-01 font-medium text-white">박아름</span>
              <RightSingle className="text-white" />
            </div>
            <span className="text-grey-3 text-caption-01 font-medium">Artist</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <BookMarkFilled className="text-grey-0" />
          <span className="text-grey-0 text-caption-02 font-medium">28</span>
        </div>
      </div>
    </div>
  );
}
