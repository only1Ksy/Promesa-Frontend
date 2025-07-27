import clsx from 'clsx';

import getPaginationRange from '@/lib/utils/get-pagination-range';
import PageLeftDoubleIcon from '@/public/icons/item/page-left-double.svg';
import PageLeftSingleIcon from '@/public/icons/item/page-left-single.svg';
import PageRightDoubleIcon from '@/public/icons/item/page-right-double.svg';
import PageRightSingleIcon from '@/public/icons/item/page-right-single.svg';

interface WishListPaginationFooterProps {
  currentPage: number;
  totalPages: number;
  push: (page: number) => void;
}

export default function WishListPaginationFooter({ currentPage, totalPages, push }: WishListPaginationFooterProps) {
  return (
    <div className="item-center flex justify-center gap-3">
      {/* start from index 0 */}
      <div className="text-grey-9 flex">
        <button onClick={() => currentPage > 0 && push(0)} className={currentPage > 0 ? 'cursor-pointer' : ''}>
          <PageLeftDoubleIcon />
        </button>
        <button
          onClick={() => currentPage > 0 && push(currentPage - 1)}
          className={currentPage > 0 ? 'cursor-pointer' : ''}
        >
          <PageLeftSingleIcon />
        </button>
      </div>
      <div className="text-caption-01 flex gap-0.5 font-medium">
        {getPaginationRange(currentPage, totalPages).map((num) => {
          const isActive = num === currentPage;
          return (
            <button
              key={num}
              onClick={() => !isActive && push(num)}
              className={clsx(
                'flex h-5 w-5 items-center justify-center',
                isActive ? 'text-grey-8' : 'text-grey-5 cursor-pointer',
              )}
            >
              {num + 1}
            </button>
          );
        })}
      </div>
      {/* end to index totalPage - 1 */}
      <div className="text-grey-9 flex">
        <button
          onClick={() => currentPage < totalPages - 1 && push(currentPage + 1)}
          className={currentPage < totalPages - 1 ? 'cursor-pointer' : ''}
        >
          <PageRightSingleIcon />
        </button>
        <button
          onClick={() => currentPage < totalPages - 1 && push(totalPages - 1)}
          className={currentPage < totalPages - 1 ? 'cursor-pointer' : ''}
        >
          <PageRightDoubleIcon />
        </button>
      </div>
    </div>
  );
}
