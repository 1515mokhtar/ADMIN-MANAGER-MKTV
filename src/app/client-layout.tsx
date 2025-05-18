'use client';

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AuthProvider } from "@/contexts/auth-context";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";

function LayoutContent({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0c0c]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#770203] border-t-transparent"></div>
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
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-[#0d0c0c]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function ClientLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <Providers>
        <NextTopLoader color="#770203" showSpinner={false} />
        <LayoutContent>{children}</LayoutContent>
      </Providers>
    </AuthProvider>
  );
} 