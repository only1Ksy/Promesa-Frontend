import type { Dispatch, SetStateAction } from 'react';
// import { useState } from 'react';
import clsx from 'clsx';

import ToggleDownIcon from '@/public/icons/my/toggle-down.svg';

export default function SelectComponent({
  value,
  setValue,
  optionList,
  widthClass,
  isHighlight = false,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  optionList: number[];
  widthClass: string;
  isHighlight?: boolean;
}) {
  // const [open, setOpen] = useState(false);

  console.log(setValue, optionList);

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-sm p-2.5',
        widthClass,
        isHighlight ? 'bg-green' : 'border-deep-green border',
      )}
    >
      <p className="text-body-02 font-medium text-black">{value}</p>
      <ToggleDownIcon />
    </div>
  );
}
