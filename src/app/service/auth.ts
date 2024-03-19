// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../infrastructure/firebase/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
