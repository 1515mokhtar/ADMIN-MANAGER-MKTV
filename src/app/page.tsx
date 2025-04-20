'use client';

import { useAuth } from "@/contexts/auth-context";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord MKTV</h1>
      <div className="bg-white dark:bg-navy-800 p-4 rounded-lg shadow">
        <p className="text-lg">
          Bienvenue, {user?.email}
        </p>
        <p className="mt-2">
          Vous êtes connecté en tant qu&apos;administrateur.
        </p>
      </div>
    </div>
  );
} 