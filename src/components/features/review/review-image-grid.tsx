'use client';

import ImageZoomModal from '@/components/common/review/image-zoom-modal';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useImageZoomModal } from '@/hooks/use-image-zoom-modal';

interface ReviewImageGridProps {
  imageUrls: string[];
}

export default function ReviewImageGrid({ imageUrls }: ReviewImageGridProps) {
  const { imageSrc, openModal, closeModal, isOpen } = useImageZoomModal();

  return (
    <>
      <div className="grid grid-cols-3 gap-x-2 gap-y-2">
        {imageUrls.map((url, idx) => (
          <div key={idx} className="bg-green relative h-29 w-28.75 overflow-hidden">
            <button onClick={() => openModal(url)} className="relative block h-full w-full cursor-pointer">
              <ImageWithEffect src={url} alt={`리뷰 이미지 ${idx + 1}`} fill sizes="115px" className="object-cover" />
            </button>
          </div>
        ))}
      </div>
      {isOpen && imageSrc && <ImageZoomModal src={imageSrc} onClose={closeModal} />}
    </>
  );
}
