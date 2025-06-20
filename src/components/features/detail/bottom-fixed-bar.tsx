import HeartFilled from '@/public/icons/item/heart-filled.svg';

export default function BottomFixedBar() {
  return (
    <>
      <div className="text-orange text-caption-01 flex h-12 w-12 flex-col items-center font-bold">
        <HeartFilled />
        <span>22</span>
      </div>
      <button className="bg-grey-9 text-body-01 text-grey-1 h-12 w-75.5 font-bold">구매하기</button>
    </>
  );
}
