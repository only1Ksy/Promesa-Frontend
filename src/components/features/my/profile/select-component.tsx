import type { Dispatch, SetStateAction } from 'react';
import Select, { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import clsx from 'clsx';

import ToggleDownIcon from '@/public/icons/my/toggle-down.svg';

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
  const options = optionList.map((opt) => ({
    value: opt,
    label: String(opt),
  }));
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  function DropdownIndicator<T>(props: DropdownIndicatorProps<T, false, GroupBase<T>>) {
    return (
      <components.DropdownIndicator {...props}>
        <ToggleDownIcon className="text-grey-5" />
      </components.DropdownIndicator>
    );
  }

  return (
    <Select
      name={name}
      value={selectedOption}
      onChange={(selected) => {
        if (selected) {
          setValue(selected.value);
        }
      }}
      options={options}
      placeholder={isPlaceholder ? '' : undefined}
      classNamePrefix="my-profile-select"
      className={clsx('text-body-02 rounded-sm font-medium text-black outline-none', widthClass)}
      components={{
        DropdownIndicator,
        IndicatorSeparator: null,
      }}
      menuPlacement={isPlaceholder ? 'top' : 'bottom'}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: isHighlight ? 'var(--color-green)' : 'transparent',
          border: isHighlight ? '1px solid var(--color-green)' : '1px solid var(--color-deep-green)',
          cursor: 'pointer',
          padding: 'calc(var(--spacing) * 2.5)',
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: 0,
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: 'calc(var(--spacing) * 131.5)',
        }),
        singleValue: (base) => ({
          ...base,
          margin: 0,
        }),
        valueContainer: (base) => ({
          ...base,
          alignItems: 'center',
          display: 'flex',
          height: 'calc(var(--spacing) * 6)',
          padding: 0,
        }),
      }}
      isSearchable={false}
    />
  );
}
