// components/review/review-pagination.tsx
import clsx from 'clsx';

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export default function ReviewPagination({ currentPage, totalPage, onPageChange }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="text-caption-01 text-grey-6 font-medium"
      >
        &lt;
      </button>
      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx('text-caption-01 px-2 font-medium', currentPage === page ? 'text-black' : 'text-grey-5')}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => currentPage < totalPage && onPageChange(currentPage + 1)}
        className="text-caption-01 text-grey-6 font-medium"
      >
        &gt;
      </button>
    </div>
  );
}
