'use client';

import Link from 'next/link';

import GoToFullListIcon from '@/public/icons/my/go-to-full-list.svg';

interface MyPageSectionProps {
  sectionTitle: string;
  subSectionList?: { subSectionTitle: string; subSectionLink: string }[];
  href?: string;
}

export default function MyPageSection({ sectionTitle, subSectionList, href }: MyPageSectionProps) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2.5">
        <div className="flex">
          <Link href={href ?? '/my'}>
            <div className="flex items-center gap-2">
              <p className="text-subhead font-bold text-black">{sectionTitle}</p>
              {href && <GoToFullListIcon className="text-grey-9" />}
            </div>
          </Link>
        </div>
        <hr className="border-t border-black" />
      </div>
      {subSectionList &&
        subSectionList.map(({ subSectionTitle, subSectionLink }, idx) => (
          <div key={idx} className="flex flex-col gap-3.5">
            <Link href={subSectionLink}>
              <p className="text-body-02 font-medium">{subSectionTitle}</p>
            </Link>
            <hr className="border-deep-green border-t-[0.75px]" />
          </div>
        ))}
    </section>
  );
}
