import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7OHq606KH6x8EOo6MXtEy7GGS1QBg0oI",
  authDomain: "authpro-3f448.firebaseapp.com",
  projectId: "authpro-3f448",
  storageBucket: "authpro-3f448.appspot.com",
  messagingSenderId: "599088364659",
  appId: "1:599088364659:web:376c94bb8205f163c6fe06",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
