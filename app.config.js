// app.config.js
import 'dotenv/config';               // carga las vars de .env
import { expo as pkg } from './app.json'; // importa el resto de tu config Expo

export default {
  ...pkg,
  extra: {
    // las variables que empiezan por EXPO_PUBLIC_ las pasamos aquí
    firebaseApiKey:       process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain:   process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId:    process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket:process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId:process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId:        process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    firebaseMeasurementId:process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    googleWebClientId:    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    apiUrl:               process.env.EXPO_PUBLIC_API_URL,
    webUrl:               process.env.EXPO_PUBLIC_WEB_URL,
  },
};
