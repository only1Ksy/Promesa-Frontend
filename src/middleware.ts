import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
