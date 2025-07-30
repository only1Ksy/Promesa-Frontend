'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useToast } from '@/components/common/alert/toast-provider';
import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import MyReviewProductCard from '@/components/features/my/review/my-review-product-card';
import BottomFixedBar from '@/components/features/my/review/write/bottom-fixed-bar';
import ReviewImageUploader from '@/components/features/my/review/write/review-image-uploader';
import ReviewRate from '@/components/features/my/review/write/review-rate';
import ReviewText from '@/components/features/my/review/write/review-text';
import useAlert from '@/hooks/use-alert';
import { DeleteReviewImage, PatchReview, PostReviewImages } from '@/services/api/review-controller';
import { WrittenReviewsResponse } from '@/types/review-controller';

interface MyReviewEditModalProps {
  reviews: WrittenReviewsResponse;
}

export default function MyReviewEditModal({ reviews }: MyReviewEditModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = Number(searchParams.get('editId'));

  const alertModal = useAlert();
  const { showToast } = useToast();

  const currentReview = reviews.find((r) => r.reviewResponse.reviewId === editId);

  const [rating, setRating] = useState(() => currentReview?.reviewResponse.rating ?? 0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [content, setContent] = useState(() => currentReview?.reviewResponse.content ?? '');
  const [originalPreviews, setOriginalPreviews] = useState<string[]>(
    () => currentReview?.reviewResponse.reviewImages ?? [],
  );
  const [deletedPreviews, setDeletedPreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(() => currentReview?.reviewResponse.reviewImages ?? []);

  const isUploadable = useMemo(() => {
    return rating > 0 && content.trim().length > 10;
  }, [rating, content]);

  if (!editId || !currentReview) return null;

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

    if (originalPreviews.includes(previewToRemove)) {
      setDeletedPreviews((prev) => [...prev, previewToRemove]);
      setOriginalPreviews((prev) => prev.filter((p) => p !== previewToRemove));
    } else {
      const newImages = [...images];
      newImages.splice(index - originalPreviews.length, 1);
      setImages(newImages);
    }

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!rating || !content.trim()) {
      alertModal({
        message: '별점과 내용(10자 이상)을 모두 입력해 주세요.',
      });
      return;
    }

    alertModal({
      message: '이대로 수정하시겠습니까?',
      confirmText: '수정',
      cancelText: '취소',
      onConfirm: async () => {
        try {
          await Promise.all(deletedPreviews.map((key) => DeleteReviewImage(key)));

          let imageKeys = [...originalPreviews];

          if (images.length > 0) {
            const fileNames = images.map((file) => file.name);
            const presigned = await PostReviewImages(
              'MEMBER',
              'REVIEW',
              currentReview.orderItemSummary.itemId,
              fileNames,
            );

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

          await PatchReview(
            currentReview.orderItemSummary.itemId,
            currentReview.reviewResponse.reviewId,
            content,
            rating,
            imageKeys,
          );

          showToast('리뷰를 수정했습니다.');
          router.replace('/my/review');
        } catch (e) {
          console.error(e);
          alertModal({
            message: '리뷰 수정에 실패했습니다. 다시 시도해주세요.',
          });
        }
      },
    });
  };

  return (
    <div
      className="bg-pale-green absolute top-0 z-50 mt-12.5 flex flex-col"
      style={{ minHeight: 'calc(100vh - 50px)' }}
    >
      <div className="flex flex-col gap-7 px-5">
        {/* 상품 정보*/}
        <div className="pt-7">
          <MyReviewProductCard
            url={currentReview.orderItemSummary.itemThumbnail}
            artistName={currentReview.orderItemSummary.artistName}
            title={currentReview.orderItemSummary.itemName}
            itemCount={currentReview.orderItemSummary.quantity}
            date={currentReview.orderItemSummary.orderDate}
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
      <BottomFixedBarPortal>
        <BottomFixedBar handleUpload={handleSubmit} barText="수정하기" isUploadable={isUploadable} />
      </BottomFixedBarPortal>
    </div>
  );
}
