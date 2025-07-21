import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';

export default function NoWishArtist() {
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-5">
      <PromesaLoginSymbolIcon className="text-deep-green" />
      <p className="text-grey-5 text-subhead font-bold">북마크에 추가한 작가가 없습니다.</p>
    </div>
  );
}
