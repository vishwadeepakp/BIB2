
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWf7qmWMDSNawIdbqeuWUMrd2g_336Uqw",
  authDomain: "bib2-498fe.firebaseapp.com",
  projectId: "bib2-498fe",
  storageBucket: "bib2-498fe.firebasestorage.app",
  messagingSenderId: "215695788266",
  appId: "1:215695788266:web:f204da8055fe0752c26f93",
  measurementId: "G-5MRQS42VK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'