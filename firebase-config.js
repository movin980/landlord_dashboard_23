// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyCozdGGtbY5VQeDxSs8Vo5IqX5nqTAEVcw",
  authDomain: "ai-for-small-plot-landlords.firebaseapp.com",
  projectId: "ai-for-small-plot-landlords",
  storageBucket: "ai-for-small-plot-landlords.appspot.com",
  messagingSenderId: "657855602798",
  appId: "1:657855602798:web:3009f2e383ce67e54fc67f",
  measurementId: "G-D2HJ54T08M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
