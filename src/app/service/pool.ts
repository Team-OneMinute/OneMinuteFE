// firebase
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

/**
 * Fetch active pools limit number
 */
export const getPools = async (gameId: string) =>{
    const db = initialize();

    const poolRef = collection(db, `${gameId}_pools`);
    const q = query(poolRef, orderBy("pot_amount", "desc"));

    const poolSnap = await getDocs(q);
    const poolsData = poolSnap.docs.map(doc => doc.data());

    const poolList = poolsData.map(data => {
      return {
        isRoot: Boolean(data.is_root),
        nextId: String(data.next_id),
        potAmount: Number(data.pot_amount),
        userId: String(data.user_id),
      } as Pool;
    });
    return poolList;
};

const initialize = () => {
    return fireStoreInitialized();
};
