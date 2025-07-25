// src/utils/firebase.ts
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
  firebaseMeasurementId,
} = Constants.expoConfig!.extra as Record<string,string>;

const firebaseConfig = {
  apiKey:               firebaseApiKey,
  authDomain:           firebaseAuthDomain,
  projectId:            firebaseProjectId,
  storageBucket:        firebaseStorageBucket,
  messagingSenderId:    firebaseMessagingSenderId,
  appId:                firebaseAppId,
  measurementId:        firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
