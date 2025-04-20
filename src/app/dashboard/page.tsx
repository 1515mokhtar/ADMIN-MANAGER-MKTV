'use client';

import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, userData } = useAuth();
  const router = useRouter();

  const handleViewProfile = () => {
    router.push('/profile');
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
          <button
            onClick={handleViewProfile}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Voir mon profil
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Informations utilisateur */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Informations utilisateur</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Nom:</span> {userData?.name || 'Non défini'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Rôle:</span> {userData?.role || 'Non défini'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Dernière connexion:</span>{' '}
                {user?.metadata.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : 'Non disponible'}
              </p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Actions rapides</h2>
            <div className="space-y-2">
              <button className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90">
                Gérer les utilisateurs
              </button>
              <button className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90">
                Voir les statistiques
              </button>
              <button 
                onClick={handleViewProfile}
                className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Mon profil
              </button>
            </div>
          </div>

          {/* Activité récente */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Activité récente</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Aucune activité récente</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 