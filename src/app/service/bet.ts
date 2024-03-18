// firebase
import {
    DocumentData,
    QuerySnapshot,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { fireStoreInitialized } from '../infrastructure/firebase/firestore';

export const betFee = () => {
    // TODO: make betFee Method
    console.log('bet fee');
};

const initialize = () => {
    return fireStoreInitialized();
};
