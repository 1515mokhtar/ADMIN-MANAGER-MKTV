// This file is intentionally left empty for server-side rendering
// Firebase will be initialized only on the client side

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug log to check environment variables
console.log('Firebase Config:', {
  hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  hasAuthDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  hasStorageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  hasMessagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  hasAppId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

// Check if all required config values are present
const isConfigValid = Object.values(firebaseConfig).every(value => value !== undefined && value !== '');
if (!isConfigValid) {
  console.error('Firebase configuration is incomplete. Please check your .env.local file.');
}

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

export const initFirebase = () => {
  if (typeof window === 'undefined') {
    console.log('Running on server side, skipping Firebase initialization');
    return null;
  }

  // Check network connectivity
  if (!navigator.onLine) {
    console.error('No internet connection available');
    return null;
  }
  
  try {
    if (!firebaseApp) {
      console.log('Initializing Firebase...');
      
      // Validate config before initialization
      if (!isConfigValid) {
        throw new Error('Invalid Firebase configuration');
      }

      firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      console.log('Firebase app initialized');

      firebaseAuth = getAuth(firebaseApp);
      console.log('Firebase Auth initialized');

      firebaseDb = getFirestore(firebaseApp);
      console.log('Firestore initialized');

      // Add network state change listener
      window.addEventListener('online', () => {
        console.log('Network connection restored');
        // Reinitialize Firebase if needed
        if (!firebaseApp) {
          initFirebase();
        }
      });

      window.addEventListener('offline', () => {
        console.log('Network connection lost');
      });
    }
    
    return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Reset Firebase instances on error
    firebaseApp = null;
    firebaseAuth = null;
    firebaseDb = null;
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