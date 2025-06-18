import getPaginationRange from '@/lib/utils/get-pagination-range';
import PageLeftDoubleIcon from '@/public/icons/item/page-left-double.svg';
import PageLeftSingleIcon from '@/public/icons/item/page-left-single.svg';
import PageRightDoubleIcon from '@/public/icons/item/page-right-double.svg';
import PageRightSingleIcon from '@/public/icons/item/page-right-single.svg';
import { ShopItemListParams } from '@/types/params.dto';

interface ItemListPaginationFooterProps {
  currentPage: number;
  totalPage: number;
  push: (next: Partial<ShopItemListParams>) => void;
}

export default function ItemListPaginationFooter({ currentPage, totalPage, push }: ItemListPaginationFooterProps) {
  return (
    <div className="item-center mx-auto flex gap-3">
      <div className="text-grey-9 flex">
        <button
          onClick={() => currentPage > 1 && push({ page: '1' })}
          className={currentPage > 1 ? 'cursor-pointer' : ''}
        >
          <PageLeftDoubleIcon />
        </button>
        <button
          onClick={() => currentPage > 1 && push({ page: String(currentPage - 1) })}
          className={currentPage > 1 ? 'cursor-pointer' : ''}
        >
          <PageLeftSingleIcon />
        </button>
      </div>
      <div className="text-caption-01 flex gap-0.5 font-medium">
        {getPaginationRange(currentPage, totalPage).map((num) => {
          const isActive = num === currentPage;
          return (
            <button
              key={`go-to-page-${num}`}
              onClick={() => !isActive && push({ page: String(num) })}
              className={`flex h-5 w-5 items-center justify-center ${isActive ? 'text-grey-8' : 'text-grey-5 cursor-pointer'}`}
            >
              {num}
            </button>
          );
        })}
      </div>
      <div className="text-grey-9 flex">
        <button
          onClick={() => currentPage < totalPage && push({ page: String(currentPage + 1) })}
          className={currentPage < totalPage ? 'cursor-pointer' : ''}
        >
          <PageRightSingleIcon />
        </button>
        <button
          onClick={() => currentPage < totalPage && push({ page: String(totalPage) })}
          className={currentPage < totalPage ? 'cursor-pointer' : ''}
        >
          <PageRightDoubleIcon />
        </button>
      </div>
    </div>
  );
}
