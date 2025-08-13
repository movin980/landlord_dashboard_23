// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqLfsIMLig9JN-WvQZ51kM6xmp38gl-Y8",
  authDomain: "landlady-63b0b.firebaseapp.com",
  projectId: "landlady-63b0b",
  storageBucket: "landlady-63b0b.firebasestorage.app",
  messagingSenderId: "596849789967",
  appId: "1:596849789967:web:070e8b0d48e4088b6d677a",
  measurementId: "G-8YKC8R3VRR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
