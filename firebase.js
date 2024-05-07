// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import the correct authentication functions
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyJQGadvrBMmW68SMLduwmrTmQwOmwre4",
  authDomain: "wassalni-420711.firebaseapp.com",
  projectId: "wassalni-420711",
  storageBucket: "wassalni-420711.appspot.com",
  messagingSenderId: "586701383888",
  appId: "1:586701383888:web:9da8ade83e9a7d12f4d6d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
