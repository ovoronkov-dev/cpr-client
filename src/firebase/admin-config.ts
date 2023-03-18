import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const adminApp = initializeApp(
  {
    apiKey: import.meta.env.VITE_ADMIN_FIRE_API_KEY,
    authDomain: import.meta.env.VITE_ADMIN_FIRE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_ADMIN_FIRE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_ADMIN_FIRE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_ADMIN_FIRE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_ADMIN_FIRE_APP_ID,
    measurementId: import.meta.env.VITE_ADMIN_FIRE_MEASUREMENT_ID,
  },
  "[admin]"
);

export const adminStorage = getStorage(adminApp);
export const adminDb = getFirestore(adminApp);
