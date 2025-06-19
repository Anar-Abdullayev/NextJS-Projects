import { NextResponse } from "next/server";

export function middleware(request) {
    const access = request.cookies.get('access');
    console.log(`middleware ${request.method} ${request.nextUrl.pathname}`);

    if (!access) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config={
    matcher:['/profile/:path*', '/upload/:path*']
}