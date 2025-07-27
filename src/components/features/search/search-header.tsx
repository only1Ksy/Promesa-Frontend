'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import BackButton from '@/components/layout/header/back-button';
import SearchIcon from '@/public/icons/layout/search.svg';

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const keywordParam = searchParams.get('keyword');
  const [inputValue, setInputValue] = useState(keywordParam ?? '');

  // debounce
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (inputValue !== '') {
        params.set('keyword', inputValue);
      } else {
        params.delete('keyword');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue, router, searchParams]);

  return (
    <>
      <BackButton />
      <div className="relative ml-5 flex flex-1 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색 PLACEHOLDER"
          className={clsx(
            'border-b-grey-9 w-full border-b pr-6 outline-none',
            'text-body-01 placeholder:text-body-02 text-grey-9 placeholder:text-grey-5 font-medium',
          )}
        />
        <SearchIcon className={inputValue === '' ? 'text-deep-green' : 'text-grey-9 cursor-pointer'} />
      </div>
    </>
  );
}
