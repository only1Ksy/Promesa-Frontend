'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import BackButton from '@/components/layout/header/back-button';
import SearchIcon from '@/public/icons/layout/search.svg';

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const keyword = searchParams.get('keyword') ?? '';
    setInputValue(keyword);
  }, [searchParams]);

  // debounce
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const isCommited = searchParams.get('commited') === 'true';
    if (isCommited) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue !== '') {
        params.set('keyword', inputValue);
      } else {
        params.delete('keyword');
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue, router, searchParams]);

  // commit
  const handleSearchCommit = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (inputValue !== '') {
      params.set('keyword', inputValue);
      params.set('commited', 'true');
    } else {
      params.delete('keyword');
      params.delete('commited');
    }

    router.replace(`?${params.toString()}`, { scroll: false });
    inputRef.current?.blur(); // remove focus

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [inputValue, router, searchParams]);

  // input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      const isCommited = searchParams.get('commited') === 'true';
      if (isCommited) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('commited');

        if (newValue !== '') {
          params.set('keyword', newValue);
        } else {
          params.delete('keyword');
        }

        router.replace(`?${params.toString()}`, { scroll: false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [router, searchParams],
  );

  return (
    <>
      <div className="my-0.75">
        <BackButton />
      </div>
      <div className="ml-5 flex flex-1 gap-0.75">
        {/* calc(var(--spacing)*1.5-1 : 37px -> 36px */}
        <div
          className={clsx(
            'flex-1 border-b pb-[calc(var(--spacing)*1.5-1)]',
            inputValue === '' ? 'border-b-deep-green' : 'border-b-grey-9',
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isComposing) {
                e.preventDefault();
                handleSearchCommit();
              }
            }}
            placeholder="원하는 아티스트나 상품을 입력해보세요."
            className={clsx(
              'h-7.5 w-full pr-6 font-medium outline-none',
              inputValue === ''
                ? 'placeholder:text-body-02 placeholder:text-grey-5 placeholder:opacity-100'
                : 'text-body-01 text-grey-9',
            )}
          />
        </div>
        <button onClick={handleSearchCommit} className="flex items-center justify-center">
          <SearchIcon className={inputValue === '' ? 'text-deep-green' : 'text-grey-9 cursor-pointer'} />
        </button>
      </div>
    </>
  );
}
