import Image from 'next/image';

export default function ArtistPageButton() {
  return (
    <div className="relative flex h-19 w-full flex-col items-start gap-[10px] px-5">
      <Image alt="product detail page artist image" src={''} />
      <div className="absolute flex h-19 w-90.5 items-center justify-between self-stretch px-5">
        <div className="flex items-start gap-4">
          <div className="flex flex-col">
            <span>박아름</span>
            <span>Artist</span>
          </div>
          <div>/</div>
        </div>
        <div className="flex flex-col">
          <span>북마크</span>
          <span>28</span>
        </div>
      </div>
    </div>
  );
}
