'use client';

import Link from 'next/link';

interface MyPageSectionProps {
  sectionTitle: string;
  subSectionList?: { subSectionTitle: string; subSectionLink: string }[];
}

export default function MyPageSection({ sectionTitle, subSectionList }: MyPageSectionProps) {
  return (
    <section className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-2.5">
        <p className="text-subhead font-bold">{sectionTitle}</p>
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
