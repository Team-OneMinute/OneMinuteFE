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

export const getGameScoreForSnapOrderScore = async (gameId: string) => {
    const db = initialize();

    const scoreRef = collection(db, `${gameId}_score`);
    const fetchScoreDescQuery = query(scoreRef, orderBy('score', 'desc'));
    const scoreSnap = await getDocs(fetchScoreDescQuery);

    return scoreSnap;
};

export const getMyScoreDocNo = async (gameId: string, userId: string) => {
    const db = initialize();

    const scoreRef = collection(db, `${gameId}_score`);
    const fetchMyScoreQuery = query(scoreRef, where('user_id', '==', userId));
    const scoreSnap = await getDocs(fetchMyScoreQuery);

    return scoreSnap.docs[0].id;
};

export const getGameScoreForObj = async (gameId: string) => {
    const db = initialize();

    const scoreRef = collection(db, `${gameId}_score`);
    const fetchScoreDescQuery = query(scoreRef, orderBy('score', 'desc'));
    const scoreSnap = await getDocs(fetchScoreDescQuery);

    return transferScoreObj(scoreSnap);
};

export const getMyGameScore = async (gameId: string, userId: string) => {
    const db = initialize();

    const scoreRef = collection(db, `${gameId}_score`);
    const fetchMyScoreQuery = query(scoreRef, where('user_id', '==', userId));
    const scoreSnap = await getDocs(fetchMyScoreQuery);

    return transferScoreObj(scoreSnap);
};

export const transferScoreObj = (snapShot: QuerySnapshot<DocumentData, DocumentData>) => {
    const scoreData = snapShot.docs.map((doc) => doc.data());

    const scoreObj = scoreData.map((data) => {
        return {
            score: Number(data.score),
            userId: String(data.user_id),
            playCount: Number(data.play_count),
            createDate: data.create_date,
            finalUpdateDate: data.final_update_date,
        } as Score;
    });
    return scoreObj;
};

export const addScoreDocument = async (gameId: string, userId: string, score: number) => {
    const db = initialize();
    const scoreRef = collection(db, `${gameId}_score`);
    const newScoreRef = doc(scoreRef);
    await setDoc(newScoreRef, {
        user_id: userId,
        score: score,
        play_count: 1,
        create_date: serverTimestamp(),
        final_update_date: serverTimestamp(),
    });
};

export const updateScoreByGameId = async (gameId: string, newScore: number, userId: string) => {
    const scoreDocNo = await getMyScoreDocNo(gameId, userId);
    await updateScoreDocByDocNo(gameId, scoreDocNo, newScore);
};

export const updateScoreDocByDocNo = async (gameId: string, docNo: string, newScore: number) => {
    const db = initialize();
    const updateScoreRef = doc(db, `${gameId}_score`, docNo);
    await updateDoc(updateScoreRef, {
        score: newScore,
        final_update_date: serverTimestamp(),
    });
};

const initialize = () => {
    return fireStoreInitialized();
};
