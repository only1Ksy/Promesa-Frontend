import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

export const BottomFixedBarTargetContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useBottomFixedBarTarget(): HTMLDivElement | null {
  const ref = useContext(BottomFixedBarTargetContext);
  return ref?.current ?? null;
}
