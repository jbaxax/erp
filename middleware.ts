// middleware.ts (Root of the project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/'];

export function middleware(request: NextRequest) {
  // Try to get the token from cookies
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. If user is NOT authenticated and tries to access a protected route
  const isPublicRoute = publicRoutes.some(route => {
    // Exact match for root path
    if (route === '/' && pathname === '/') return true;
    // Prefix match for other routes
    return route !== '/' && pathname.startsWith(route);
  });

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. If user is already authenticated and tries to access login, redirect to dashboard
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes should execute the middleware
export const config = {
  matcher: [
    /*
     * Matcher to exclude:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, public files (.svg, .png, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker\\.js|.*\\.svg$).*)',
  ],
};