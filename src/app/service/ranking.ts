import { collection, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

export const upsertRanking = async (gameId: string, score: number, userId?: string) =>{
    const db = initialize();

    const ui: string | undefined = userId || "0002A";

    // score upsert
    // select score
    const scoreRef = collection(db, `${gameId}_score`);
    const fetchScoreDescQuery = query(scoreRef, orderBy("score", "desc"));
    const scoreSnap = await getDocs(fetchScoreDescQuery);
    const scoreFetchData = scoreSnap.docs.map(doc => doc.data());
    const scoreIndex = scoreFetchData.findIndex(scoreData => scoreData.user_id == ui);
    console.log("score fetch, gameId: " + gameId + ", score: " + score + ", userId: " + ui + ", scoreIndex: " + scoreIndex);
    console.log(scoreFetchData);
    // update score

    // pool fetch
    // pool.length
    // pool.update
    // user.claimable(update)
};

const initialize = () => {
    return fireStoreInitialized();
};
