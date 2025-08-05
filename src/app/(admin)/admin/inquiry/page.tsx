'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { deleteInquiry, editInquiry, postNewInquiry } from '@/services/api/admin/admin-inquiry-controller';

export default function AdminInquiryPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(deleteInquiry);
  console.log(editInquiry);
  console.log(postNewInquiry);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">문의 등록/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
