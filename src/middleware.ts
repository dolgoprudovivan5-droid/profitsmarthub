// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const isTelegram = userAgent.includes('Telegram');

    const currentPath = request.nextUrl.pathname;
    const isAlreadyRedirected = currentPath.startsWith('/telegram-redirect');

    if (isTelegram && !isAlreadyRedirected) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = '/telegram-redirect';
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

// applies to all routes except static files, _next, etc.
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api).*)',
    ],
};
