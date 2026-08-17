import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6yq5ehmvlSnQ1lZ3fxNXT0M8LzlsMKZI",
  authDomain: "sameem-354c3.firebaseapp.com",
  projectId: "sameem-354c3",
  storageBucket: "sameem-354c3.firebasestorage.app",
  messagingSenderId: "225759674234",
  appId: "1:225759674234:web:988c6ce2feb751f4aba0c3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
