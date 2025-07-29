'use client';

import { useState } from 'react';

import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import MyReviewProductCard from '@/components/features/my/review/my-review-product-card';
import BottomFixedBar from '@/components/features/my/review/write/bottom-fixed-bar';
import ReviewImageUploader from '@/components/features/my/review/write/review-image-uploader';
import ReviewRate from '@/components/features/my/review/write/review-rate';
import ReviewText from '@/components/features/my/review/write/review-text';
import { DeleteReviewImage, PatchReview, PostReviewImages } from '@/services/api/review-controller';

interface MyReviewEditModalProps {
  itemId: number;
  reviewId: number;
  initialRating: number;
  initialContent: string;
  initialPreviews: string[];
  productThumbnail: string;
  artistName: string;
  itemName: string;
  itemCount: number;
  orderDate: string;
  setIsModalOpen: () => void;
}

export default function MyReviewEditModal({
  itemId,
  reviewId,
  initialRating,
  initialContent,
  initialPreviews,
  productThumbnail,
  artistName,
  itemName,
  itemCount,
  orderDate,
  setIsModalOpen,
}: MyReviewEditModalProps) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState<number | null>(null);
  const [content, setContent] = useState(initialContent);
  // 기존 서버 이미지
  const [originalPreviews, setOriginalPreviews] = useState<string[]>(initialPreviews);
  // 삭제한 기존 이미지 key
  const [deletedPreviews, setDeletedPreviews] = useState<string[]>([]);
  // 새로 추가한 이미지
  const [images, setImages] = useState<File[]>([]);
  // 미리보기 통합 리스트
  const [previews, setPreviews] = useState<string[]>(initialPreviews);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3 - images.length);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...fileArray]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleImageRemove = (index: number) => {
    const previewToRemove = previews[index];

    // 기존 이미지에서 삭제
    if (originalPreviews.includes(previewToRemove)) {
      setDeletedPreviews((prev) => [...prev, previewToRemove]);
      setOriginalPreviews((prev) => prev.filter((p) => p !== previewToRemove));
    } else {
      // 새로 추가된 이미지 삭제
      const newImages = [...images];
      newImages.splice(index - originalPreviews.length, 1);
      setImages(newImages);
    }

    // 전체 프리뷰에서 제거
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!rating || !content.trim()) {
      alert('별점과 내용을 모두 입력해 주세요.');
      return;
    }

    try {
      await Promise.all(deletedPreviews.map((key) => DeleteReviewImage(key)));

      let imageKeys: string[] = [...originalPreviews];

      if (images.length > 0) {
        const fileNames = images.map((file) => file.name);
        const presigned = await PostReviewImages('MEMBER', 'REVIEW', itemId, fileNames);

        await Promise.all(
          presigned.map((item, i) =>
            fetch(item.url, {
              method: 'PUT',
              headers: { 'Content-Type': images[i].type },
              body: images[i],
            }),
          ),
        );

        const newKeys = presigned.map((item) => item.key);
        imageKeys = [...imageKeys, ...newKeys];
      }

      await PatchReview(itemId, reviewId, content, rating, imageKeys);

      alert('리뷰 수정 성공!');
      setIsModalOpen();
    } catch (e) {
      if (typeof window !== 'undefined') {
        window.console.error(e);
      }
      alert('리뷰 등록 실패');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-7 px-5" style={{ minHeight: 'calc(100vh - 46px)' }}>
        {/* 상품 정보*/}
        <div className="pt-7">
          <MyReviewProductCard
            url={productThumbnail}
            artistName={artistName}
            title={itemName}
            itemCount={itemCount}
            date={orderDate}
          />
        </div>

        <div className="bg-green h-[1px] w-full" />
        {/* 별점 */}
        <ReviewRate rating={rating} hovered={hovered} setRating={setRating} setHovered={setHovered} />

        <div className="bg-green h-[1px] w-full" />
        {/* 텍스트 */}
        <ReviewText content={content} setContent={setContent} />

        <div className="bg-green h-[1px] w-full" />
        {/* 이미지 업로드 */}
        <ReviewImageUploader
          images={images}
          previews={previews}
          handleImageChange={handleImageChange}
          handleImageRemove={handleImageRemove}
        />
      </div>
      {/* 제출 버튼 */}
      <BottomFixedBarPortal>
        <BottomFixedBar handleUpload={handleSubmit} />
      </BottomFixedBarPortal>
    </>
  );
}
