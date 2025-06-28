'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ReviewImageOnlyProps {
  imageUrls: string[]; // 전체 이미지 배열
}

export default function ReviewImageOnly({ imageUrls }: ReviewImageOnlyProps) {
  const router = useRouter();
  const previewImages = imageUrls.slice(0, 2);
  const extraCount = imageUrls.length - previewImages.length;

  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-body-02 px-5 font-bold">모아보기</span>
      <div className="flex gap-2 px-5 pb-8">
        {previewImages.map((src, index) => (
          <div key={index} className="bg-green aspect-square w-29 overflow-hidden">
            <Image
              src={src}
              alt={`리뷰 이미지 ${index + 1}`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
        ))}

        {extraCount > 0 && (
          <button
            onClick={() => router.push('/review?mode=imageOnly')}
            className="bg-grey-4 flex aspect-square w-29 cursor-pointer flex-col items-center justify-center font-medium text-white"
          >
            <span className="text-body-02 font-medium">더보기</span>
            <span className="text-body-01 font-bold">+{extraCount}</span>
          </button>
        )}
      </div>
      <div className="border-deep-green/50 mb-3 h-0 w-90.5 self-center border-b" />
    </div>
  );
}
