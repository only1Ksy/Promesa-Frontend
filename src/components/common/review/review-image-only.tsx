'use client';

import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';

interface ReviewImageOnlyProps {
  imageUrls: string[]; // 전체 이미지 배열
  itemId: number;
}

export default function ReviewImageOnly({ imageUrls, itemId }: ReviewImageOnlyProps) {
  const previewImages = imageUrls.slice(0, 3);
  const extraCount = imageUrls.length - previewImages.length;

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-body-02 px-5 font-bold">모아보기</span>
      <div className="flex gap-2 px-5 pb-8">
        {previewImages.map((src, index) => {
          if (index === 2) {
            return (
              <Link key={index} href={`/detail/${itemId}/review?mode=imageOnly`}>
                <div className="relative aspect-square w-28.75 cursor-pointer overflow-hidden">
                  <ImageWithEffect
                    src={src}
                    alt={`리뷰 이미지 ${index + 1}`}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                    <span className="text-body-02 font-medium">더보기</span>
                    <span className="text-body-01 font-bold">+{extraCount}</span>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <div key={index} className="bg-green aspect-square w-28.75 overflow-hidden">
              <ImageWithEffect
                src={src}
                alt={`리뷰 이미지 ${index + 1}`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
      <div className="border-deep-green/50 mb-3 h-0 w-90.5 self-center border-b" />
    </div>
  );
}
