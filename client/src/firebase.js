// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-71574.firebaseapp.com",
  projectId: "real-estate-71574",
  storageBucket: "real-estate-71574.firebasestorage.app",
  messagingSenderId: "882786980923",
  appId: "1:882786980923:web:f1ff7431d1e75f7a4eb81e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);