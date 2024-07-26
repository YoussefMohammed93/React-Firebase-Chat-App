import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-app-bc969.firebaseapp.com",
  projectId: "react-chat-app-bc969",
  storageBucket: "react-chat-app-bc969.appspot.com",
  messagingSenderId: "951034870091",
  appId: "1:951034870091:web:32f18f8c32026e064c10ce",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const DB = getFirestore();
export const storage = getStorage();
