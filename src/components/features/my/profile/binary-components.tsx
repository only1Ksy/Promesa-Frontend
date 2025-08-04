import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export default function BinaryComponent({
  value,
  setValue,
  trueText,
  falseText,
  isNull = false,
}: {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  trueText: string;
  falseText: string;
  isNull?: boolean;
  isAlert?: string | null;
}) {
  return (
    <div className="flex gap-10">
      <button onClick={() => setValue(true)} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className={clsx('h-4 w-4', !isNull && value ? 'bg-orange' : 'bg-grey-4')} />
          <div className={clsx('text-body-02 font-medium', !isNull && value ? 'text-[#000000]' : 'text-grey-5')}>
            {trueText}
          </div>
        </div>
      </button>
      <button onClick={() => setValue(false)} className="cursor-pointer">
        <div className="flex items-center gap-2">
          <div className={clsx('h-4 w-4', !isNull && !value ? 'bg-orange' : 'bg-grey-4')} />
          <div className={clsx('text-body-02 font-medium', !isNull && !value ? 'text-[#000000]' : 'text-grey-5')}>
            {falseText}
          </div>
        </div>
      </button>
    </div>
  );
}
