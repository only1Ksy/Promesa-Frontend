import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';

export default function NoWishArtist() {
  return (
    // 49 = 11.5 (header height) + 5 (padding top) + 7.5 (title height) + 5 (gap) + 20 (padding bottom)
    <div className="flex h-[calc(100vh-var(--spacing)*49)] flex-col items-center justify-center gap-5">
      <PromesaLoginSymbolIcon className="text-deep-green" />
      <p className="text-grey-5 text-subhead font-bold">북마크한 아티스트가 없습니다.</p>
    </div>
  );
}
