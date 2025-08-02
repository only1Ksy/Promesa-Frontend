import { useRouter } from 'next/navigation';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { formatKoreanDateTime } from '@/lib/utils/date-format';

interface MyReviewProductCardProps {
  url: string;
  artistName: string;
  title: string;
  itemCount: number;
  date: string;
  itemId?: number;
}

export default function MyReviewProductCard({
  url,
  artistName,
  title,
  itemCount,
  date,
  itemId,
}: MyReviewProductCardProps) {
  const router = useRouter();
  const { year, month, day } = formatKoreanDateTime(date);

  const handleImageClick = () => {
    if (itemId) {
      router.push(`/detail/${itemId}`);
    }
  };

  return (
    <div className="flex gap-4.5">
      {!itemId ? (
        <div>
          <ImageWithEffect width={92} height={115} src={url} alt={'상품 미리보기 이미지'} className="object-cover" />
        </div>
      ) : (
        <button className="cursor-pointer" onClick={handleImageClick}>
          <ImageWithEffect width={92} height={115} src={url} alt={'상품 미리보기 이미지'} className="object-cover" />
        </button>
      )}
      <div className="flex h-28.75 w-63 flex-col justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-body-02 font-bold">{artistName}</span>
          <span className="text-body-01 font-medium">{title}</span>
          <span className="text-body-02 text-grey-5 font-medium">{itemCount}개</span>
        </div>
        <div className="text-grey-5 text-caption-01 gap-1 self-end font-medium">
          <span>구매일자: </span>
          <span>
            {String(year)}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
