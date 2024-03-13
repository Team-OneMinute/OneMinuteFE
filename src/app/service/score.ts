// firebase
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore";

export const getGameScore = async (gameId: string) => {
    const db = initialize();

    const scoreCollection = collection(db, `${gameId}_score`);
    const scoreDocs = await getDocs(scoreCollection);

    // HACK: sortは、Fetchのタイミングでsortかけたほうが早い場合はリファクタ
    const scoreData = scoreDocs.docs.map(doc => doc.data());

    const score = scoreData.map(data => {
        return {
          score: Number(data.score),
          userId: String(data.user_id),
          playCount: Number(data.play_count),
          createDate: data.create_date,
          finalUpdateDate: data.final_update_date,
        } as Score;
    });

    return score;
};

const sortRanking = (scoreList: Score[]) => {

};

const initialize = () => {
    return fireStoreInitialized();
};
