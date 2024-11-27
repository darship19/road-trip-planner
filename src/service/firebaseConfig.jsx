// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwZTw8Wj_xBRb0cUzY37BF1AsBh1gv3pY",
  authDomain: "trip-app-9f397.firebaseapp.com",
  projectId: "trip-app-9f397",
  storageBucket: "trip-app-9f397.firebasestorage.app",
  messagingSenderId: "507183180900",
  appId: "1:507183180900:web:31d49cafba1e3e2d504371",
  measurementId: "G-448ZCPQ281"
};

// Initialize Firebase
//export we can use it throughout the applications
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
