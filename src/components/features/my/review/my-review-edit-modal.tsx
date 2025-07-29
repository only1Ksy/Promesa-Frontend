'use client';

import { useState } from 'react';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import MyReviewProductCard from '@/components/features/my/review/my-review-product-card';
import BottomFixedBar from '@/components/features/my/review/write/bottom-fixed-bar';
import ReviewImageUploader from '@/components/features/my/review/write/review-image-uploader';
import ReviewRate from '@/components/features/my/review/write/review-rate';
import ReviewText from '@/components/features/my/review/write/review-text';
import { fetchMyEligibleReviews } from '@/services/api/review-controller';
import { PostReview, PostReviewImages } from '@/services/api/review-controller';

interface MyReviewEditModalProps {
  orderId: number;
  orderDetailState: DehydratedState;
}

export default function MyReviewEditModal({ orderId, orderDetailState }: MyReviewEditModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const itemId = Number(searchParams.get('item'));

  const { data: eligibleReviews, isLoading } = useQuery({
    queryKey: ['eligibleReviews'],
    queryFn: () => fetchMyEligibleReviews(),
    select: (res) => res,
  });

  if (!eligibleReviews || isLoading) return null;

  const orderItem = eligibleReviews.find((item) => item.orderItemId === itemId);

  if (!orderItem) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 3 - images.length);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...fileArray]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!rating || !content.trim()) {
      alert('별점과 내용을 모두 입력해 주세요.');
      return;
    }

    try {
      let imageKeys: string[] = [];

      if (images.length > 0) {
        const fileNames = images.map((file) => file.name);
        // 1) PresignedUrl 발급 받기
        const presigned = await PostReviewImages('MEMBER', 'REVIEW', orderId, fileNames);
        console.log(presigned);

        await Promise.all(
          presigned.map((item, i) =>
            fetch(item.url, {
              // presigned URL로 이미지를 업로드
              method: 'PUT',
              headers: { 'Content-Type': images[i].type },
              body: images[i],
            }),
          ),
        );

        imageKeys = presigned.map((item) => item.key); // 리뷰 등록에 key를 넘김
      }

      await PostReview(orderItem.orderItemId, content, rating, imageKeys);
      alert('리뷰 등록 성공!');
    } catch (e) {
      if (typeof window !== 'undefined') {
        window.console.error(e);
      }
      alert('리뷰 등록 실패');
    }
  };

  return (
    <HydrationBoundary state={orderDetailState}>
      <div className="flex flex-col gap-7 px-5" style={{ minHeight: 'calc(100vh - 46px)' }}>
        {/* 상품 정보*/}
        <div className="pt-7">
          <MyReviewProductCard
            url={orderItem.itemThumbnail}
            artistName={orderItem.artistName}
            title={orderItem.itemName}
            itemCount={orderItem.quantity}
            date={orderItem.orderDate}
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
    </HydrationBoundary>
  );
}
