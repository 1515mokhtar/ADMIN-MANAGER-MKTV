import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuthState(requireAdmin: boolean = false): AuthState {
  const { user, isAdmin, loading, error } = useAuth();
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Vérifier les permissions
    if (!loading) {
      if (!user) {
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          isLoading: false,
          error: 'Non authentifié',
        });
        router.push('/login');
      } else if (requireAdmin && !isAdmin) {
        setAuthState({
          isAuthenticated: true,
          isAdmin: false,
          isLoading: false,
          error: 'Accès non autorisé',
        });
        router.push('/access-denied');
      } else {
        setAuthState({
          isAuthenticated: true,
          isAdmin: isAdmin,
          isLoading: false,
          error: null,
        });
      }
    }
  }, [user, isAdmin, loading, requireAdmin, router]);

  return authState;
} 