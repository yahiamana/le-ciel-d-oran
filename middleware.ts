import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretString = process.env.JWT_SECRET;
if (!secretString && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is not set in production. Please set it in .env");
}
const JWT_SECRET = new TextEncoder().encode(secretString || "super-secret-key-for-development");

export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow access to the login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_token')?.value

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  try {
    // Verify the JWT token
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    // Token is invalid or expired
    console.warn("Invalid JWT token", error);
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    // Clear the invalid cookie
    response.cookies.delete('admin_token')
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
