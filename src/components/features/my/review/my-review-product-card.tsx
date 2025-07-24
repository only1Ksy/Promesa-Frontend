import ImageWithEffect from '@/components/common/utilities/image-with-effect';

interface MyReviewProductCardProps {
  url: string;
  artistName: string;
  title: string;
  itemCount: number;
  date: string;
}

export default function MyReviewProductCard({ url, artistName, title, itemCount, date }: MyReviewProductCardProps) {
  return (
    <div className="flex gap-4.5">
      <div>
        <ImageWithEffect width={92} height={92} src={url} alt={'상품 미리보기 이미지'} className="object-cover" />
      </div>
      <div className="flex h-23 w-63 flex-col justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-body-02 font-bold">{artistName}</span>
          <span className="text-body-01 font-medium">{title}</span>
          <span className="text-body-02 text-grey-5 font-medium">{itemCount}개</span>
        </div>
        <div className="text-grey-5 text-caption-01 gap-1 self-end font-medium">
          <span>구매일자: </span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
