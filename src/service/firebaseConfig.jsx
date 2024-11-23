// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwVjbszD7jjPmGw2EJ4Oceub8BPRxxlWg",
  authDomain: "travel-planner-fe338.firebaseapp.com",
  projectId: "travel-planner-fe338",
  storageBucket: "travel-planner-fe338.firebasestorage.app",
  messagingSenderId: "825137742080",
  appId: "1:825137742080:web:35f84f4d9f275c36acb3e5",
  measurementId: "G-JY7D6F8RHN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
