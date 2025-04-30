"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
    const firebaseAuth = auth();
    if (!firebaseAuth) return;
    
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setLoading(true);
      
      if (currentUser) {
        try {
          const firestoreDb = db();
          if (!firestoreDb) return;
          
          const userDoc = await getDoc(doc(firestoreDb, "users", currentUser.uid));
          const role = userDoc.data()?.role?.trim();
          
          const isUserAdmin = userDoc.exists() && role === "admin";
          setIsAdmin(isUserAdmin);
          setUser(currentUser);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNonAdminUser = async () => {
    setError("Access denied. Admin privileges required.");
    await logout();
    router.push("/login");
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const firebaseAuth = auth();
      if (!firebaseAuth) throw new Error("Firebase Auth not initialized");
      
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      
      const firestoreDb = db();
      if (!firestoreDb) throw new Error("Firestore not initialized");
      
      const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
      const role = userDoc.data()?.role?.trim();
      
      const isUserAdmin = userDoc.exists() && role === "admin";
      
      if (!isUserAdmin) {
        await handleNonAdminUser();
        return;
      }
      
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      const firebaseAuth = auth();
      if (!firebaseAuth) throw new Error("Firebase Auth not initialized");
      
      await signOut(firebaseAuth);
      setUser(null);
      setIsAdmin(false);
      setUserData(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const firebaseAuth = auth();
      if (!firebaseAuth) throw new Error("Firebase Auth not initialized");
      
      await sendPasswordResetEmail(firebaseAuth, email);
      setError(null);
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    error,
    userData,
    signIn,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}