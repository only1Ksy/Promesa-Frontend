import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export default function InputComponent({
  name,
  value,
  setValue,
  readOnly = false,
  isHighlight = false,
  isPhone = false,
}: {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
  isHighlight?: boolean;
  isPhone?: boolean;
}) {
  return (
    <div
      className={clsx(
        'flex min-w-0 flex-1 items-center rounded-sm p-2.5',
        isHighlight ? 'bg-green border-green border' : 'border-deep-green border',
      )}
    >
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => {
          if (isPhone) {
            const raw = e.target.value;
            const digitsOnly = raw.replace(/\D/g, '');
            if (digitsOnly.length <= 4) {
              setValue(digitsOnly);
            }
          } else setValue(e.target.value);
        }}
        className="text-body-02 text-grey-7 w-full origin-left scale-[0.875] text-base font-medium outline-none"
        autoComplete="off"
        inputMode={isPhone ? 'numeric' : undefined}
        readOnly={readOnly}
      />
    </div>
  );
}
