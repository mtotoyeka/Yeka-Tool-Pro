
// Yeka Tool Pro - Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUu2bAZ0UMfeWySYogiCgg8hg02NXXS9U",
  authDomain: "yekah-tool-pro.firebaseapp.com",
  projectId: "yekah-tool-pro",
  storageBucket: "yekah-tool-pro.firebasestorage.app",
  messagingSenderId: "556500827371",
  appId: "1:556500827371:web:e1dead6464392ee84092ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Cloud Firestore
export const db = getFirestore(app);

// Export app if needed by other files
export { app };
