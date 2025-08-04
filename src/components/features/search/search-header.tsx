'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import BackButton from '@/components/layout/header/back-button';
import { useSearchKeywordStore } from '@/lib/store/use-search-keyword-store';
import SearchIcon from '@/public/icons/layout/search.svg';
import { getQueryClient } from '@/services/query/client';

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { keyword, setKeyword, setCommitted } = useSearchKeywordStore();
  const [localKeyword, setLocalKeyword] = useState(keyword);

  // debounce
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setKeyword(localKeyword);
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['search', keyword] });
    }, 150);

    return () => clearTimeout(timeoutRef.current!);
  }, [localKeyword, keyword, setKeyword]);

  // commit
  const handleSearchCommit = useCallback(() => {
    const current = new URLSearchParams(searchParams.toString());
    current.set('keyword', keyword);
    setCommitted(true);

    router.replace(`?${current.toString()}`, { scroll: false });

    inputRef.current?.blur(); // remove focus
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [keyword, searchParams, router, setCommitted]);

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
            localKeyword === '' ? 'border-b-deep-green' : 'border-b-grey-9',
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={localKeyword}
            onChange={(e) => {
              setLocalKeyword(e.target.value);
              setCommitted(false);
            }}
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
              localKeyword === ''
                ? 'placeholder:text-body-02 placeholder:text-grey-5 placeholder:opacity-100'
                : 'text-body-01 text-grey-9',
            )}
          />
        </div>
        <button onClick={handleSearchCommit} className="flex items-center justify-center">
          <SearchIcon className={localKeyword === '' ? 'text-deep-green' : 'text-grey-9 cursor-pointer'} />
        </button>
      </div>
    </>
  );
}
