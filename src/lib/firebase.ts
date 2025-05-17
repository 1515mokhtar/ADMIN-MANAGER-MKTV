// This file is intentionally left empty for server-side rendering
// Firebase will be initialized only on the client side

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

export const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    if (!firebaseApp) {
      firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      firebaseAuth = getAuth(firebaseApp);
      firebaseDb = getFirestore(firebaseApp);

      // Connect to emulators if in development
      if (process.env.NODE_ENV === 'development') {
        try {
          // Use localhost instead of 127.0.0.1 for better compatibility
          if (firebaseAuth) {
            connectAuthEmulator(firebaseAuth, 'http://localhost:9099', { disableWarnings: true });
            console.log('Auth emulator connected');
          }
          if (firebaseDb) {
            connectFirestoreEmulator(firebaseDb, 'localhost', 8080);
            console.log('Firestore emulator connected');
          }
        } catch (emulatorError) {
          console.error('Error connecting to emulators:', emulatorError);
        }
      }
    }
    
    return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
};

// Export getters that will initialize Firebase if needed
export const getFirebaseApp = () => {
  if (typeof window === 'undefined') return null;
  if (!firebaseApp) initFirebase();
  return firebaseApp;
};

export const getFirebaseAuth = () => {
  if (typeof window === 'undefined') return null;
  if (!firebaseAuth) initFirebase();
  return firebaseAuth;
};

export const getFirebaseDb = () => {
  if (typeof window === 'undefined') return null;
  if (!firebaseDb) initFirebase();
  return firebaseDb;
};

// For backward compatibility
export const auth = () => getFirebaseAuth();
export const db = () => getFirebaseDb(); 