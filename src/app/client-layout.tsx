'use client';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/auth-context";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";

function LayoutContent({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Si on est sur la page de login, afficher directement le contenu
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Si l'utilisateur n'est pas connecté et n'est pas sur la page de login
  if (!user && !isLoginPage) {
    return null; // Le middleware redirigera vers la page de login
  }

  // Afficher le layout complet pour les utilisateurs connectés
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <Providers>
        <NextTopLoader color="#5750F1" showSpinner={false} />
        <LayoutContent>{children}</LayoutContent>
      </Providers>
    </AuthProvider>
  );
} 