import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };


const firebaseConfig = {
  apiKey: "AIzaSyCtwZrS7wQ0o6UpdKZjQWlSYFfjkYRUGhQ",
  authDomain: "democracy-wars.firebaseapp.com",
  projectId: "democracy-wars",
  storageBucket: "democracy-wars.firebasestorage.app",
  messagingSenderId: "596184313216",
  appId: "1:596184313216:web:c3f6a443ae665bce622565",
  measurementId: "G-KX0XFGDRQ4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

export default app;
