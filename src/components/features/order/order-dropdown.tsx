'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import Expandable from '@/components/common/utilities/expandable';
import DropdownIcon from '@/public/icons/layout/scroll-to-top.svg';

interface DropdownItem {
  label: string;
  value: string;
}

interface OrderDropdownProps {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  width?: string;
}

export default function OrderDropdown({ items, onSelect, width = 'w-full' }: OrderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    onSelect(item.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${width}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'bg-green flex w-full cursor-pointer items-center justify-between p-2.5 text-left text-black',
          isOpen ? 'rounded-t-md' : 'rounded-md',
        )}
      >
        {selected.label}
        <DropdownIcon className={clsx('transition-transform', isOpen ? '' : 'rotate-180')} />
      </button>

      <div className="absolute top-full left-0 z-10 w-full">
        <Expandable flag={isOpen} collapsedMaxHeight={0} durationTime={300}>
          <ul className="bg-green h-full">
            {items
              .filter((item) => item.value) // value가 빈 문자열이거나 falsy한 항목 제거
              .map((item) => (
                <li
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  className="hover:bg-deep-green cursor-pointer p-2.5 transition-colors"
                >
                  {item.label}
                </li>
              ))}
          </ul>
        </Expandable>
      </div>
    </div>
  );
}
