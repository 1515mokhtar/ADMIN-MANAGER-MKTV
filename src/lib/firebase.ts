// This file is intentionally left empty for server-side rendering
// Firebase will be initialized only on the client side

// Create a client-side only Firebase initialization
let firebaseApp: any = null;
let firebaseAuth: any = null;
let firebaseDb: any = null;

// Function to initialize Firebase only on the client side
export const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  if (!firebaseApp) {
    try {
      // Dynamically import Firebase modules
      import('firebase/app').then(({ initializeApp, getApps, getApp }) => {
        import('firebase/auth').then(({ getAuth }) => {
          import('firebase/firestore').then(({ getFirestore }) => {
            const firebaseConfig = {
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
              messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
            };

            // Check if Firebase is already initialized
            if (!getApps().length) {
              firebaseApp = initializeApp(firebaseConfig);
            } else {
              firebaseApp = getApp();
            }

            firebaseAuth = getAuth(firebaseApp);
            firebaseDb = getFirestore(firebaseApp);
          });
        });
      });
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }
  
  return { app: firebaseApp, auth: firebaseAuth, db: firebaseDb };
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
export const auth = getFirebaseAuth;
export const db = getFirebaseDb; 