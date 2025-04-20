"use client";

import { useAuth } from '@/contexts/auth-context';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CameraIcon } from "./_components/icons";
import { SocialAccounts } from "./_components/social-accounts";
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProfilePage() {
  const { user, userData, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          }
        } catch (error) {
          console.error("Erreur lors du chargement des données:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher un message
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold">Profil utilisateur</h1>
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <div className="text-center">
              <h2 className="mb-4 text-xl font-semibold">Vous n'êtes pas connecté</h2>
              <p className="mb-6 text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
              <button
                onClick={() => router.push('/login')}
                className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Profil utilisateur</h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          {/* Section Photo de Profil */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-200">
              {profileData?.photoURL ? (
                <Image
                  src={profileData.photoURL}
                  alt="Photo de profil"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary text-4xl text-white">
                  {profileData?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <button 
                className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-lg"
                title="Changer la photo de profil"
              >
                <CameraIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold">{profileData?.name || user?.email?.split('@')[0] || 'Utilisateur'}</h2>
            <p className="text-gray-600">{profileData?.role || 'Administrateur'}</p>
          </div>

          {/* Informations personnelles */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Informations personnelles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="rounded-lg bg-gray-50 p-3">
                  <span className="block text-sm font-medium text-gray-500">Email</span>
                  <span className="text-gray-900">{user?.email}</span>
                </p>
                {profileData?.phone && (
                  <p className="rounded-lg bg-gray-50 p-3">
                    <span className="block text-sm font-medium text-gray-500">Téléphone</span>
                    <span className="text-gray-900">{profileData.phone}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <p className="rounded-lg bg-gray-50 p-3">
                  <span className="block text-sm font-medium text-gray-500">Dernière connexion</span>
                  <span className="text-gray-900">
                    {user?.metadata.lastSignInTime
                      ? new Date(user.metadata.lastSignInTime).toLocaleString()
                      : 'Non disponible'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-6">
            <h2 className="mb-4 text-xl font-semibold">Actions</h2>
            <div className="space-y-2">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isLoggingOut ? 'Déconnexion en cours...' : 'Se déconnecter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
