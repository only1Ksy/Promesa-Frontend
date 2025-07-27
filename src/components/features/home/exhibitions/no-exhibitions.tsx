import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';

export default function NoExhibtions() {
  return (
    <div className="absolute inset-0 flex h-full flex-col items-center justify-center gap-5">
      <PromesaLoginSymbolIcon className="text-deep-green" />
      <p className="text-grey-5 text-subhead font-bold">해당하는 기획전이 없습니다.</p>
    </div>
  );
}
