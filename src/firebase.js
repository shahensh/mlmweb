// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHTnFSlXo3LxKb4cKPwLdunKSFKoahYJU",
  authDomain: "mlm-website-3ad94.firebaseapp.com",
  databaseURL: "https://mlm-website-3ad94-default-rtdb.firebaseio.com",
  projectId: "mlm-website-3ad94",
  storageBucket: "mlm-website-3ad94.firebasestorage.app",
  messagingSenderId: "637980116870",
  appId: "1:637980116870:web:4e8e562f5baf6aaed08e07",
  measurementId: "G-DFT67G67GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, analytics, database, auth }; 