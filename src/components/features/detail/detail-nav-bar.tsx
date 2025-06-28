import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface DetailNavBarProps {
  onSelect: (section: 'product' | 'notice' | 'review') => void;
  active: 'product' | 'notice' | 'review';
}

export default function DetailNavBar({ onSelect, active }: DetailNavBarProps) {
  const [isReady, setIsReady] = useState(false);

  const sections: { id: 'product' | 'notice' | 'review'; label: string }[] = [
    { id: 'product', label: '상품정보' },
    { id: 'notice', label: '안내사항' },
    { id: 'review', label: '리뷰' },
  ];

  const activeIndex = sections.findIndex((section) => section.id === active);

  // 컴포넌트 마운트 후 transition 활성화
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

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

      <div
        className={clsx('absolute bottom-0 h-0.5 bg-black', isReady && 'transition-transform duration-300 ease-in-out')}
        style={{
          width: `${100 / sections.length}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
    </div>
  );
}
