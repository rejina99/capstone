// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vhomes-3da04.firebaseapp.com",
  projectId: "vhomes-3da04",
  storageBucket: "vhomes-3da04.appspot.com",
  messagingSenderId: "714323718631",
  appId: "1:714323718631:web:13775a4fc56c7dffc48d42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);