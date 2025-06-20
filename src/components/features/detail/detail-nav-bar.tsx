export default function DetailNavBar() {
  return (
    <div className="text-grey-9 text-subhead border-grey-2 flex h-12 w-full items-start border-t font-medium">
      <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
        <span>상품정보</span>
      </div>
      <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
        <span>안내사항</span>
      </div>
      <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
        <span>리뷰</span>
      </div>
    </div>
  );
}
