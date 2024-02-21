import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const fireStoreInitialized = () => {
    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
};
