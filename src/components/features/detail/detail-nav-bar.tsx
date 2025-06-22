import clsx from 'clsx';

interface DetailNavBarProps {
  onSelect: (section: 'product' | 'notice' | 'review') => void;
  active: 'product' | 'notice' | 'review';
}

export default function DetailNavBar({ onSelect, active }: DetailNavBarProps) {
  const sections: { id: 'product' | 'notice' | 'review'; label: string }[] = [
    { id: 'product', label: '상품정보' },
    { id: 'notice', label: '안내사항' },
    { id: 'review', label: '리뷰' },
  ];

  // 현재 활성 탭 인덱스 계산
  const activeIndex = sections.findIndex((section) => section.id === active);

  return (
    <div className="bg-pale-green text-subhead border-grey-2 relative flex h-12 w-full items-start border-t font-medium">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          onClick={() => onSelect(id)}
          className="flex w-33.5 cursor-pointer flex-col items-center gap-2 pt-3 pb-2"
        >
          <span className={clsx(active === id ? 'text-grey-9' : 'text-grey-4')}>{label}</span>
        </div>
      ))}

      {/* 애니메이션 인디케이터 */}
      <div
        className="absolute bottom-0 h-0.5 bg-black transition-transform duration-300 ease-in-out"
        style={{
          width: `${100 / sections.length}%`, // 각 탭의 너비만큼
          transform: `translateX(${activeIndex * 100}%)`, // 활성 탭 위치로 이동
        }}
      />
    </div>
  );
}
