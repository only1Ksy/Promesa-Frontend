'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { editItemDetail, postNewItem } from '@/services/api/admin/admin-item-controller';

export default function AdminItemPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(editItemDetail);
  console.log(postNewItem);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">작품 등록/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
