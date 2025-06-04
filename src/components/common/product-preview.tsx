'use client';

import { useState } from 'react';

import HeartEmptyIcon from '@/public/icons/common/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/common/heart-filled.svg';

interface ProductPreviewPros {
  artist: string;
  name: string;
  sale: string;
  price: string;
}

export default function ProductPreview({ artist, name, sale, price }: ProductPreviewPros) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative flex h-75 w-44 flex-col gap-2.5">
      <button onClick={() => setLiked(!liked)} className="absolute top-1.25 right-1.25 z-10 cursor-pointer">
        {liked ? (
          <HeartFilledIcon className="text-orange h-7.5 w-7.5" />
        ) : (
          <HeartEmptyIcon className="text-pale-green h-7.5 w-7.5" />
        )}
      </button>
      <div className="bg-green h-full w-full" />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col">
          <p className="text-caption-01 text-grey-600 font-medium">{artist}</p>
          <p className="text-body-01 font-medium text-black">{name}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-body-02 text-orange font-medium">{sale}</p>
          <p className="text-body-02 font-regular text-black">{price}</p>
        </div>
      </div>
    </div>
  );
}
