// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// Define protected routes
const protectedRoutes = ['/dashboard', '/admin']
const publicRoutes = ['/login', '/signup', '/','/about']

export default async function middleware(req) {
  const path = req.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  )
  const isPublicRoute = publicRoutes.includes(path)

  // Decrypt session from cookie
  const cookie = (await cookies()).get('session')?.value
  const session = cookie ? await decrypt(cookie) : null
  // session shape: { id, username, isAdmin, expiresAt }

  // 1. Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 2. Admin route protection
  if (path.startsWith('/admin') && !session?.isAdmin) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  // 3. Redirect authenticated users away from public routes
  if (isPublicRoute && session?.id && !path.startsWith('/dashboard')) {
    // If admin, send to /admin dashboard
    const target = session.isAdmin ? '/admin' : '/dashboard'
    return NextResponse.redirect(new URL(target, req.url))
  }

  return NextResponse.next()
}

// Apply middleware to all routes except static assets and API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
