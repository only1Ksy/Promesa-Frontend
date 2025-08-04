'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import BackButton from '@/components/layout/header/back-button';
import SearchIcon from '@/public/icons/layout/search.svg';

export default function SearchHeader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const [inputValue, setInputValue] = useState(() => {
    const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
    return params.get('keyword') ?? '';
  });

  const isBackRef = useRef(false);

  // remain commited when router.back
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setInputValue(params.get('keyword') ?? '');
      isBackRef.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // debounce
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isBackRef.current) {
      isBackRef.current = false;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      const hadCommitted = params.get('commited') === 'true';

      if (inputValue) params.set('keyword', inputValue);
      else params.delete('keyword');

      params.delete('commited');

      router.replace(`?${params.toString()}`, { scroll: false });

      if (hadCommitted) window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inputValue, router]);

  // commit
  const handleSearchCommit = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

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
  }, [inputValue, router]);

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
            onChange={(e) => setInputValue(e.target.value)}
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
