import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18next/router';
import i18nextConfig from '../next-i18next.config'; // Adjust path if next-i18next.config.js is in root

export function middleware(request: NextRequest) {
  // Run next-i18next router
  const i18nMiddlewareResponse = i18nRouter(request, i18nextConfig);
  if (i18nMiddlewareResponse) return i18nMiddlewareResponse;

  // If no i18n-specific response, continue with normal Next.js processing
  return NextResponse.next();
}

// Specify paths for middleware to run on
export const config = {
  matcher: [
    // Match all paths except for static assets and API routes
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
