import Link from 'next/link';

import EmptySymbolIcon from '@/public/icons/logo/empty-symbol.svg';

interface EmptyCardProps {
  main: string;
  sub: string;
  buttonText: string;
}

export default function EmptyCard({ main, sub, buttonText }: EmptyCardProps) {
  return (
    <div className="absolute inset-0 flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-25">
        <div className="flex flex-col items-center gap-8.5">
          <EmptySymbolIcon className="text-grey-9" />
          <div className="flex flex-col items-center gap-2">
            <p className="text-subhead text-grey-9 font-bold">{main}</p>
            <p className="text-body-01 text-grey-5 font-medium">{sub}</p>
          </div>
        </div>
        <div className="w-full px-7.5">
          <Link href="/shop">
            <div className="radius-xs flex h-11 w-full items-center justify-center border-2 border-[#000000]">
              <p className="text-body-02 text-grey-9 font-medium">{buttonText}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
