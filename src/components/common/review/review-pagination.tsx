// components/review/review-pagination.tsx
import clsx from 'clsx';

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function ReviewPagination({ currentPage, totalPage, onPageChange }: Props) {
  return (
    <div className="z-905 flex gap-3">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="text-caption-01 text-grey-6 cursor-pointer font-medium"
      >
        &lt;
      </button>
      <div>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              'text-caption-01 cursor-pointer px-2.5 font-medium',
              currentPage === page ? 'text-black' : 'text-grey-5',
            )}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => currentPage < totalPage && onPageChange(currentPage + 1)}
        className="text-caption-01 text-grey-6 cursor-pointer font-medium"
      >
        &gt;
      </button>
    </div>
  );
}
