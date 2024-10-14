import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith('/protected') ||
    req.nextUrl.pathname.startsWith('/api/protected');

  if (isProtectedRoute && !req.auth) {
    // Add the original URL as a callbackUrl query parameter
    const signInUrl = new URL('/signin', req.url);

    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
