'use client';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';

interface ReviewImageGridProps {
  imageUrls: string[];
}

export default function ReviewImageGrid({ imageUrls }: ReviewImageGridProps) {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-2">
      {imageUrls.map((url, idx) => (
        <div key={idx} className="bg-green relative h-29 w-28.75 overflow-hidden">
          <ImageWithEffect src={url} alt={`리뷰 이미지 ${idx + 1}`} fill sizes="115px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
