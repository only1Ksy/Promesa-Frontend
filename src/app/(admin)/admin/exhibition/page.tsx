'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { createExhibition, editExhibition } from '@/services/api/admin/admin-exhibition-controller';

export default function AdminExhibitionPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(createExhibition);
  console.log(editExhibition);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">기획전 등록/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
