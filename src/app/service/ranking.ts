// firebase
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore";

export const getGameRanking = async (gameId: string) => {
    const db = initialize();

    const rankingsCollection = collection(db, `${gameId}_ranking`);
    const rankingDocs = await getDocs(rankingsCollection);

    // HACK: sortは、Fetchのタイミングでsortかけたほうが早い場合はリファクタ
    const rankingData = rankingDocs.docs.map(doc => doc.data());

    const ranking = rankingData.map(data => {
        return {
          isRoot: Boolean(data.is_root),
          nextId: String(data.next_id),
          score: Number(data.score),
          userId: String(data.user_id),
        } as Ranking;
    });

    return ranking;
};

const sortRanking = (rankingList: Ranking[]) => {

};

const initialize = () => {
    return fireStoreInitialized();
};
