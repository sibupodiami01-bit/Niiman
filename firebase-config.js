import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTsyBd2R_IJlLE5RIe2LU-qmFGoy4Z9EM",
  authDomain: "niiman.firebaseapp.com",
  projectId: "niiman",
  storageBucket: "niiman.firebasestorage.app",
  messagingSenderId: "1020687925097",
  appId: "1:1020687925097:web:9c9ed7d2cd14c14cc007f8",
  measurementId: "G-ECXRTESZD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
