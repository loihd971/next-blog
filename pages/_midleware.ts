import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("request", request);
    
    if (request.nextUrl.pathname.startsWith('/about-me')) {
        return NextResponse.redirect(new URL('/about-mememe/', request.url))
      }

}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/post/:path*',
// }