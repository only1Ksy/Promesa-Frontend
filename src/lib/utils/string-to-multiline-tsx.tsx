import { ReactNode } from 'react';
import React from 'react';

export default function stringToMultilineTSX(text: string): ReactNode {
  return text.split('\n').map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx !== text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
}
