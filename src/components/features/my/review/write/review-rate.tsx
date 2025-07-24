'use client';

interface ReviewRateProps {
  rating: number;
  hovered: number | null;
  setRating: (value: number) => void;
  setHovered: (value: number | null) => void;
}

export default function ReviewRate({ rating, hovered, setRating, setHovered }: ReviewRateProps) {
  return (
    <div className="mb-6 flex gap-1 text-2xl">
      {[1, 2, 3, 4, 5].map((val) => (
        <span
          key={val}
          className={`cursor-pointer select-none ${(hovered ?? rating) >= val ? 'text-yellow-400' : 'text-gray-300'}`}
          onMouseEnter={() => setHovered(val)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setRating(val)}
        >
          *
        </span>
      ))}
    </div>
  );
}
