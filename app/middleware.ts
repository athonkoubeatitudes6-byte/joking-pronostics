import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const adminEmail = "beatitudeathonkou7@gmail.com"

  const userEmail = request.cookies.get("user_email")?.value

  // Protection page admin
  if (url.pathname.startsWith("/admin")) {
    if (!userEmail) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (userEmail !== adminEmail) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}