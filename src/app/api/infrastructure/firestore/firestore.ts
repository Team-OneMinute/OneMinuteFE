import { getFirestore, FieldValue, DocumentData } from 'firebase-admin/firestore';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const serviceAccount = require('./firebase-stg-service-account.json');

if (!getApps()?.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}
export const getSnapByDocKey = async (collectionId: string, docId: string) => {
    const docRef = await getFirestore().collection(collectionId).doc(docId).get();
    const docSnap = await docRef.data();
    return docSnap;
}

export const addDocument = async (collectionId: string, docId: string, data: DocumentData) => {
    const writeResult = await getFirestore().collection(collectionId).doc(docId).create(data);
    console.log(writeResult);
};