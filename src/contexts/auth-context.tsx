"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebase";
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      console.error("Firebase Auth not initialized");
      setError("Firebase Auth not initialized. Please check your internet connection and try again.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const db = getFirebaseDb();
          if (!db) {
            throw new Error("Firestore not initialized");
          }

          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          
          if (!userDoc.exists()) {
            console.warn("User document not found in Firestore");
            setUserData(null);
            setIsAdmin(false);
            return;
          }

          const userData = userDoc.data();
          const role = userData?.role?.trim();
          
          const isUserAdmin = role === "admin";
          setIsAdmin(isUserAdmin);
          setUser(currentUser);
          setUserData(userData);
          setError(null);
        } catch (error: any) {
          console.error("Error fetching user data:", error);
          if (error.code === 'network-request-failed') {
            setError("Network error. Please check your internet connection and try again.");
          } else {
            setError("Failed to fetch user data. Please try again later.");
          }
          setUserData(null);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setUserData(null);
        setError(null);
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
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase Auth not initialized. Please check your internet connection and try again.");
      }

      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const db = getFirebaseDb();
      if (!db) {
        throw new Error("Firestore not initialized. Please check your internet connection and try again.");
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        throw new Error("User document not found. Please contact support.");
      }

      const userData = userDoc.data();
      const role = userData?.role?.trim();
      
      const isUserAdmin = role === "admin";
      
      if (!isUserAdmin) {
        await handleNonAdminUser();
        return;
      }
      
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.code === 'auth/network-request-failed') {
        setError("Network error. Please check your internet connection and try again.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address. Please check and try again.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Please check and try again.");
      } else {
        setError(error.message || "Failed to sign in. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase Auth not initialized");
      }

      setLoading(true);
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setUserData(null);
      setError(null);
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      if (error.code === 'network-request-failed') {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError("Failed to sign out");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error("Firebase Auth not initialized");
      }

      setError(null);
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setError(null);
    } catch (error: any) {
      console.error("Password reset error:", error);
      if (error.code === 'network-request-failed') {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError(error.message || "Failed to reset password");
      }
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};