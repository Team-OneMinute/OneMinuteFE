import { getFirestore, DocumentData, Filter, WhereFilterOp } from 'firebase-admin/firestore';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

const serviceAccount = require('./firebase-stg-service-account.json');

if (!getApps()?.length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
};

export const getSnapByDocKey = async (collectionId: string, docId: string) => {
    const docRef = await getFirestore().collection(collectionId).doc(docId).get();
    const docSnap = await docRef.data();
    return docSnap;
};

export const getSnapByQuery = async (collectionId: string, query: string[]) => {
    const filter = Filter.where(query[0], query[1] as WhereFilterOp, query[2]);
    const querySnap = await getFirestore().collection(collectionId).where(filter).get();
    const docSnaps = querySnap.docs.map((docRef) => {
        return docRef.data();
    });
    return docSnaps;
};

export const addDocument = async (collectionId: string, docId: string, data: DocumentData) => {
    const writeResult = await getFirestore().collection(collectionId).doc(docId).create(data);
    console.log(writeResult);
};

export const updateDocument = async (collectionId: string, docId: string, updateData: any) => {
    const updateResult = await getFirestore().collection(collectionId).doc(docId).update(updateData);;
    return updateResult;
};