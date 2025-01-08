import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const path = request.nextUrl.pathname

  if (path.startsWith('/admin') && path !== '/admin/login') {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!session || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

