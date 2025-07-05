'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchMe } from '@/services/api/member-controller';

export default function MyProfile() {
  const { data } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
  });

  return (
    <div className="p-4">
      <h1 className="mb-2 text-xl font-semibold">My Profile</h1>
      <ul className="space-y-1">
        <li>
          <strong>Name:</strong> {data.name}
        </li>
        <li>
          <strong>Provider:</strong> {data.provider}
        </li>
        <li>
          <strong>Provider ID:</strong> {data.providerId}
        </li>
      </ul>
    </div>
  );
}
