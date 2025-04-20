"use client";

import { PropsWithChildren } from "react";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";

export default function AuthWrapper({ children }: PropsWithChildren) {
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

  // Si l'utilisateur n'est pas connecté et n'est pas sur la page de login
  if (!user && !isLoginPage) {
    return null; // Le middleware redirigera vers la page de login
  }

  // Afficher le contenu
  return <>{children}</>;
} 