import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface MyReviewToggleProps {
  onSelect: (section: 'available' | 'written') => void;
  active: 'available' | 'written';
}

export default function MyReviewToggle({ onSelect, active }: MyReviewToggleProps) {
  const [isReady, setIsReady] = useState(false);

  const sections: { id: 'available' | 'written'; label: string }[] = [
    { id: 'available', label: '작성 가능한 리뷰' },
    { id: 'written', label: '내 리뷰' },
  ];

  const activeIndex = sections.findIndex((section) => section.id === active);

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
          className="flex w-50.25 cursor-pointer flex-col items-center gap-2 pt-3 pb-2"
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
