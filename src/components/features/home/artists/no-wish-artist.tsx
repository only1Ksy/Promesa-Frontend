import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';

export default function NoWishArtist() {
  return (
    <div className="mt-37.5 flex flex-col items-center gap-5">
      <PromesaLoginSymbolIcon className="text-deep-green" />
      <p className="text-grey-5 text-subhead font-bold">북마크한 아티스트가 없습니다.</p>
    </div>
  );
}
