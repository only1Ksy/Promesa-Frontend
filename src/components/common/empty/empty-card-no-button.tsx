import EmptyLogoIcon from '@/public/icons/logo/login-symbol.svg';

interface EmptyCardProps {
  text: string;
}

export default function EmptyCard({ text }: EmptyCardProps) {
  return (
    <div className="absolute inset-0 flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <EmptyLogoIcon className="text-grey-5" />
        <p className="text-subhead text-grey-9 font-bold">{text}</p>
      </div>
    </div>
  );
}
