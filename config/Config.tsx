import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyAIu7QeVmwjKqDmpvPf7JZN4Qhl5qIuHuY",
  authDomain: "taller1-2990e.firebaseapp.com",
  databaseURL: "https://taller1-2990e-default-rtdb.firebaseio.com",
  projectId: "taller1-2990e",
  storageBucket: "taller1-2990e.appspot.com",
  messagingSenderId: "20213390283",
  appId: "1:20213390283:web:ba6cabf6d1f5760364f44e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = getStorage(app)
