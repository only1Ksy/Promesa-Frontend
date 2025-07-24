'use client';

import Image from 'next/image';

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
  return (
    <div className="mb-6">
      {/* 이미지 업로드 input */}
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={images.length >= 3}
        className="mb-3 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        onChange={handleImageChange}
      />

      {/* 업로드 상태 설명 */}
      <p className="mb-3 text-sm text-gray-500">
        최대 3장까지 업로드 가능 (현재 <span className="font-semibold">{images.length}</span>장)
      </p>

      {/* 이미지 미리보기 */}
      <div className="flex flex-wrap gap-3">
        {previews.map((src, idx) => (
          <div key={idx} className="relative h-28 w-28 overflow-hidden rounded border border-gray-200">
            <Image src={src} alt={`preview-${idx}`} className="h-full w-full object-cover" />
            <button
              onClick={() => handleImageRemove(idx)}
              className="absolute top-1 right-1 rounded-full bg-white p-1 text-xs text-red-500 shadow-md hover:bg-red-100"
              aria-label={`이미지 ${idx + 1} 삭제`}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
