'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchMe } from '@/services/api/member-controller';

export default function MyProfile() {
  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  return (
    <div className="mt-10">
      <p className="text-headline-04">
        안녕하세요, <strong className="font-semibold">{`${data.name}님`}</strong>.
      </p>
    </div>
  );
}
