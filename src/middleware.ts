import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes qui nécessitent une authentification
const protectedRoutes: string[] = [];
// Routes qui nécessitent un rôle admin
const adminRoutes: string[] = ['/dashboard'];
// Routes publiques
const publicRoutes: string[] = ['/login', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier l'authentification via le token Firebase
  const authToken = request.cookies.get('__session')?.value;
  const isAuthenticated = !!authToken;

  // Rediriger vers login si non authentifié sur une route protégée
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rediriger vers profile si non authentifié sur une route admin
  if (adminRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Rediriger vers profile si déjà authentifié sur login
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login',
  ],
}; 