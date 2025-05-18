import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes qui nécessitent une authentification
const protectedRoutes: string[] = [];
// Routes qui nécessitent un rôle admin
const adminRoutes: string[] = ['/dashboard'];
// Routes publiques
const publicRoutes: string[] = ['/login', '/profile'];

// Liste des chemins publics qui ne nécessitent pas d'authentification
const publicPaths = ['/login', '/forgot-password', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si le chemin actuel est public
  const isPublicPath = publicPaths.includes(pathname);
  
  // Vérifier si l'utilisateur a un token d'authentification
  const token = request.cookies.get('auth-token')?.value;

  // Si l'utilisateur n'a pas de token et essaie d'accéder à une route protégée
  if (!token && !isPublicPath) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur a un token et essaie d'accéder à une route publique
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 