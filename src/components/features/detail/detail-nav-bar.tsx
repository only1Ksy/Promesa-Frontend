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

  return (
    <div className="bg-pale-green text-subhead border-grey-2 flex h-12 w-full items-start border-t font-medium">
      {sections.map(({ id, label }) => (
        <div
          key={id}
          onClick={() => onSelect(id)}
          className={clsx(
            'flex w-33.5 cursor-pointer flex-col items-center gap-2 pt-3',
            active === id && 'border-b-2 border-black',
          )}
        >
          <span className={clsx(active === id ? 'text-grey-9' : 'text-grey-4')}>{label}</span>
        </div>
      ))}
    </div>
  );
}
