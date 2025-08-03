import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
// You can also use environment variables for better security
const firebaseConfig = {
  apiKey: "AIzaSyB0zi1qpNEi82D-k-RKUqahoTDzRPuDbpA",
  authDomain: "portfolio-44fc0.firebaseapp.com",
  projectId: "portfolio-44fc0",
  storageBucket: "portfolio-44fc0.firebasestorage.app",
  messagingSenderId: "554605763393",
  appId: "1:554605763393:web:500436181a3e7ed6ac5fc0",
  measurementId: "G-9YWS78S61H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app; 