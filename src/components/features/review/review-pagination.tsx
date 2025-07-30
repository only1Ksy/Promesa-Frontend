'use client';

import clsx from 'clsx';

import getPaginationRange from '@/lib/utils/get-pagination-range';
import PageLeftDoubleIcon from '@/public/icons/item/page-left-double.svg';
import PageLeftSingleIcon from '@/public/icons/item/page-left-single.svg';
import PageRightDoubleIcon from '@/public/icons/item/page-right-double.svg';
import PageRightSingleIcon from '@/public/icons/item/page-right-single.svg';

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function ReviewPagination({ currentPage, totalPage, onPageChange }: Props) {
  return (
    <div className="item-center absolute bottom-10 mx-auto flex gap-3">
      {/* 왼쪽 이동 버튼들 */}
      <div className="text-grey-9 flex">
        <button onClick={() => currentPage > 1 && onPageChange(0)} className={currentPage > 1 ? 'cursor-pointer' : ''}>
          <PageLeftDoubleIcon />
        </button>
        <button
          onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
          className={currentPage > 0 ? 'cursor-pointer' : ''}
        >
          <PageLeftSingleIcon />
        </button>
      </div>

      {/* 페이지 번호 버튼 */}
      <div className="text-caption-01 flex gap-0.5 font-medium">
        {getPaginationRange(currentPage, totalPage).map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => !isActive && onPageChange(page)}
              className={clsx(
                'flex h-5 w-5 items-center justify-center',
                isActive ? 'text-grey-8' : 'text-grey-5 cursor-pointer',
              )}
            >
              {page + 1}
            </button>
          );
        })}
      </div>

      {/* 오른쪽 이동 버튼들 */}
      <div className="text-grey-9 flex">
        <button
          onClick={() => currentPage + 1 < totalPage && onPageChange(currentPage + 1)}
          className={currentPage + 1 < totalPage ? 'cursor-pointer' : ''}
        >
          <PageRightSingleIcon />
        </button>
        <button
          onClick={() => currentPage + 1 < totalPage && onPageChange(totalPage - 1)}
          className={currentPage + 1 < totalPage ? 'cursor-pointer' : ''}
        >
          <PageRightDoubleIcon />
        </button>
      </div>
    </div>
  );
}
