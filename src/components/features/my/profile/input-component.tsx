import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export default function InputComponent({
  value,
  setValue,
  readOnly = false,
  isHighlight = false,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
  isHighlight?: boolean;
}) {
  return (
    <div
      className={clsx(
        'flex min-w-0 flex-1 items-center rounded-sm p-2.5',
        isHighlight ? 'bg-green' : 'broder-deep-green border',
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-body-02 text-grey-7 w-full font-medium outline-none"
        readOnly={readOnly}
      />
    </div>
  );
}
