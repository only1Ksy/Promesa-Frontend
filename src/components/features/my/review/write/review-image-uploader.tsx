'use client';

import Image from 'next/image';

import CloseIcon from '@/public/icons/layout/close.svg';

interface ReviewImageUploaderProps {
  images: File[];
  previews: string[];
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageRemove: (index: number) => void;
}

export default function ReviewImageUploader({
  images,
  previews,
  handleImageChange,
  handleImageRemove,
}: ReviewImageUploaderProps) {
  const showUploadButton = images.length < 3;

  return (
    <div className="mb-6">
      <p className="mb-3 text-base font-medium text-gray-800">상품 사진을 첨부해주세요.</p>

      <div className="flex flex-wrap gap-2">
        {/* 이미지 미리보기 */}
        {previews.map((src, idx) => (
          <div key={idx} className="bg-green relative h-29 w-28.75 overflow-hidden rounded">
            <Image src={src} alt={`preview-${idx}`} fill className="rounded object-cover" />
            <button
              onClick={() => handleImageRemove(idx)}
              className="hover:bg-deep-green/50 absolute top-1 right-1 z-10 cursor-pointer rounded-full p-[3px]"
              aria-label={`이미지 ${idx + 1} 삭제`}
            >
              <CloseIcon width={16} height={16} />
            </button>
          </div>
        ))}

        {/* 업로드 버튼 */}
        {showUploadButton && (
          <label
            htmlFor="image-upload"
            className="bg-green flex h-29 w-28.75 cursor-pointer items-center justify-center rounded-sm"
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
              disabled={images.length >= 3}
            />
            <CloseIcon width={30} height={30} className="rotate-45" />
          </label>
        )}
      </div>
    </div>
  );
}
