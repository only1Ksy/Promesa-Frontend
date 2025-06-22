import { ReactNode } from 'react';

export default function stringToMultilineTSX(text: string, className?: string): ReactNode {
  return text.split('\n').map((line, idx) => (
    <span key={idx} className={className}>
      {line}
      {idx !== text.split('\n').length - 1 && <br />}
    </span>
  ));
}
