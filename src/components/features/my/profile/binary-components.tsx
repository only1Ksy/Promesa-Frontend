import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export default function BinaryComponent({
  value,
  setValue,
  trueText,
  falseText,
}: {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  trueText: string;
  falseText: string;
}) {
  return (
    <div className="flex gap-10">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setValue((prev) => !prev)}
          className={clsx('h-4 w-4 cursor-pointer', value ? 'bg-orange' : 'bg-grey-4')}
        />
        <div className={clsx('text-body-02 font-medium', value ? 'text-[#000000]' : 'text-grey-5')}>{trueText}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setValue((prev) => !prev)}
          className={clsx('h-4 w-4 cursor-pointer', !value ? 'bg-orange' : 'bg-grey-4')}
        />
        <div className={clsx('text-body-02 font-medium', !value ? 'text-[#000000]' : 'text-grey-5')}>{falseText}</div>
      </div>
      <div className="flex gap-2"></div>
    </div>
  );
}
