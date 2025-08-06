import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

export default function SelectComponent<T extends string | number>({
  name,
  value,
  setValue,
  optionList,
  widthClass,
  isHighlight = false,
  isPlaceholder = false,
}: {
  name: string;
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  optionList: T[];
  widthClass: string;
  isHighlight?: boolean;
  isPlaceholder?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rawValue = e.target.value;
    const parsedValue = typeof optionList[0] === 'number' ? Number(rawValue) : rawValue;
    setValue(parsedValue as T);
  };

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={clsx(
        'text-body-02 h-11.5 cursor-pointer appearance-none items-center rounded-sm p-2.5 align-middle font-medium text-black outline-none',
        widthClass,
        isHighlight ? 'bg-green border-green border' : 'border-deep-green border',
        'bg-right bg-no-repeat',
      )}
      style={{
        backgroundImage: `url('/icons/my/toggle-down-with-strict-color.svg')`,
        backgroundPosition: 'right 0.625rem center',
      }}
    >
      {optionList.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
      {isPlaceholder && <option value={0} disabled />}
    </select>
  );
}
