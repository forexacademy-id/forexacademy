import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZLqNF840Rh4U0xtJ0SCsR0R6n_2RlKi4",
  authDomain: "forex-academy-du.firebaseapp.com",
  projectId: "forex-academy-du",
  storageBucket: "forex-academy-du.firebasestorage.app",
  messagingSenderId: "123449417052",
  appId: "1:123449417052:web:64e29a72e4890c86a2f599"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
