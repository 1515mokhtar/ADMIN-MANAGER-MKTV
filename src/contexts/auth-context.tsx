"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  error: string | null;
  userData: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  error: null,
  userData: null,
  signIn: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const role = userDoc.data()?.role?.trim();
          
          const isUserAdmin = userDoc.exists() && role === "admin";
          setIsAdmin(isUserAdmin);
          setUser(currentUser);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }

          if (!isUserAdmin && window.location.pathname.startsWith('/dashboard')) {
            await handleNonAdminUser();
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          if (window.location.pathname.startsWith('/dashboard')) {
            await handleNonAdminUser();
          }
        }
      } else {
        setIsAdmin(false);
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNonAdminUser = async () => {
    console.warn('User is not admin or document missing, logging out...');
    await signOut(auth);
    setIsAdmin(false);
    setUser(null);
    setUserData(null);
    setError("Accès non autorisé. Seuls les administrateurs peuvent se connecter.");
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (!userDoc.exists()) {
        throw new Error("Document utilisateur introuvable.");
      }

      const role = userDoc.data()?.role?.trim();
      if (role !== "admin") {
        throw new Error("Accès non autorisé. Seuls les administrateurs peuvent se connecter.");
      }

      setIsAdmin(true);
      setUser(userCredential.user);
      setUserData(userDoc.data());
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Échec de la connexion. Veuillez réessayer.";
      
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Format d'email invalide.";
          break;
        case "auth/user-disabled":
          errorMessage = "Ce compte a été désactivé.";
          break;
        case "auth/user-not-found":
          errorMessage = "Aucun utilisateur trouvé avec cet email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Mot de passe incorrect.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Identifiants invalides. Veuillez vérifier votre email et mot de passe.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Trop de tentatives. Veuillez réessayer plus tard ou réinitialiser votre mot de passe.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Erreur réseau. Veuillez vérifier votre connexion internet.";
          break;
      }
      
      setError(errorMessage);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setUserData(null);
      router.push('/login');
    } catch (error: any) {
      console.error("Logout error:", error);
      setError(error.message || "Échec de la déconnexion. Veuillez réessayer.");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      let errorMessage = "Échec de l'envoi de l'email de réinitialisation.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "Aucun utilisateur trouvé avec cet email.";
      }
      
      setError(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAdmin, 
      error, 
      userData,
      signIn, 
      logout,
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}