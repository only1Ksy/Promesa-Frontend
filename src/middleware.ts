// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ONLY_PATH = '/login';
const PROTECTED_PATHS = ['/cart', '/my'];
const LOGOUT_PATH = '/logout';

function isLoggedIn(req: NextRequest): boolean {
  return Boolean(req.cookies.get('refresh')?.value);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = isLoggedIn(req);

  if (pathname === LOGOUT_PATH) {
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (PROTECTED_PATHS.includes(pathname) && !loggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('afterLogin', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(PUBLIC_ONLY_PATH) && loggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/my', '/login', '/logout'],
};
