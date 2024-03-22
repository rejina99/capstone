// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "v-estate.firebaseapp.com",
  projectId: "v-estate",
  storageBucket: "v-estate.appspot.com",
  messagingSenderId: "376419903540",
  appId: "1:376419903540:web:3b86b5d178ad345eeac261"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);