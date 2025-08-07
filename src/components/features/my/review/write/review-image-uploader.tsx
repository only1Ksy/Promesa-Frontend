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
  previews,
  handleImageChange,
  handleImageRemove,
}: ReviewImageUploaderProps) {
  const showUploadButton = previews.length < 3;

  console.log(previews);

  return (
    <div className="mb-6 pb-21">
      <div className="text-body-02 mb-3 flex gap-0.5 font-medium">
        <span className="text-black">상품 사진을 첨부해주세요.</span>
        <span className="text-grey-5">(선택)</span>
      </div>
      <div className="flex flex-wrap gap-1.75">
        {/* 이미지 미리보기 */}
        {previews.map((src, idx) => (
          <div key={idx} className="bg-green relative h-29 w-28.75 overflow-hidden rounded">
            {/* 이미지 */}
            <Image src={src} alt={`preview-${idx}`} fill className="rounded object-cover" />

            {/* 그라디언트 오버레이 */}
            <div className="absolute top-0 left-0 h-10 w-full rounded bg-gradient-to-b from-[rgba(34,34,34,0.42)] to-[rgba(34,34,34,0)]" />

            {/* 삭제 버튼 */}
            <button
              onClick={() => handleImageRemove(idx)}
              className="absolute top-1 right-1 z-10 cursor-pointer rounded-full p-0.75 hover:bg-black/50"
              aria-label={`이미지 ${idx + 1} 삭제`}
            >
              <CloseIcon width={20} height={20} className="text-white" />
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
              disabled={previews.length >= 3}
            />
            <CloseIcon width={30} height={30} className="rotate-45" />
          </label>
        )}
      </div>
    </div>
  );
}
