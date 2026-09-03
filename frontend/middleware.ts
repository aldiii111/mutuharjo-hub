import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse {
    const hostname = req.headers.get('host') || ''
    if(hostname.startsWith('ppdb.')) {
        const url = req.nextUrl.clone();
        url.pathname = `/ppdb-subdomain${url.pathname}`
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|uploads|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};