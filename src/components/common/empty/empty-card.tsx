import EmptySymbolIcon from '@/public/icons/logo/empty-symbol.svg';

interface EmptyCardProps {
  main: string;
  sub: string;
  buttonText: string;
}

export default function EmptyCard({ main, sub, buttonText }: EmptyCardProps) {
  return (
    <div className="flex w-57.75 flex-col items-center gap-25">
      <div className="flex flex-col items-center gap-8.5">
        <EmptySymbolIcon />
        <div className="flex flex-col items-center gap-2">
          <span className="text-grey-9 text-subhead font-bold">{main}</span>
          <span className="text-grey-5 text-body-01 font-mediums">{sub}</span>
        </div>
      </div>
      <button className="h-11 w-44.25 items-center justify-center rounded-xs border">{buttonText}</button>
    </div>
  );
}
