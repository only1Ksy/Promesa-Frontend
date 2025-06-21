interface DetailNavBarProps {
  onSelect: (section: 'product' | 'notice' | 'review') => void;
  active: 'product' | 'notice' | 'review'; // 현재 활성 탭
}

export default function DetailNavBar({ onSelect, active }: DetailNavBarProps) {
  return (
    <div className="bg-pale-green text-subhead border-grey-2 flex h-12 w-full items-start border-t font-medium">
      {(['product', 'notice', 'review'] as const).map((section) => (
        <div
          key={section}
          onClick={() => onSelect(section)}
          className={`flex w-33.5 cursor-pointer flex-col items-center gap-2 pt-3 pb-2 ${
            active === section ? 'border-b border-black' : ''
          }`}
        >
          <span className={active === section ? 'text-grey-9' : 'text-grey-4'}>
            {section === 'product' ? '상품정보' : section === 'notice' ? '안내사항' : '리뷰'}
          </span>
        </div>
      ))}
    </div>
  );
}
