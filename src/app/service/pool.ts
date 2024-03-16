// firebase
import { collection, query, orderBy, getDocs, QuerySnapshot, DocumentData, doc, updateDoc } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

/**
 * Fetch active pools limit number
 */
export const getPoolsForObj = async (gameId: string) =>{
    const db = initialize();

    const poolRef = collection(db, `${gameId}_pools`);
    const q = query(poolRef, orderBy("pot_amount", "desc"));

    const poolSnap = await getDocs(q);

    return transferPoolObj(poolSnap);
};

export const getPoolsForSnap = async (gameId: string) =>{
  const db = initialize();

  const poolRef = collection(db, `${gameId}_pools`);
  const q = query(poolRef, orderBy("pot_amount", "desc"));
  const poolSnap = await getDocs(q);

  return poolSnap;
};

export const updatePoolsByDocNo = async (gameId: string, docNo: string, potAmount: number) => {
  const db = initialize();
  const updatePoolRef = doc(db, `${gameId}_pools`, docNo);
  await updateDoc(
      updatePoolRef, 
      {
        pot_amount: potAmount,
      });
}

export const getPoolSize = (snapShot: QuerySnapshot<DocumentData, DocumentData>) =>{
  return snapShot.docs.length;
};

export const transferPoolObj = (snapShot: QuerySnapshot<DocumentData, DocumentData>) => {
  const poolsData = snapShot.docs.map(doc => doc.data());

  const poolObj = poolsData.map(data => {
    return {
      isRoot: Boolean(data.is_root),
      nextId: String(data.next_id),
      potAmount: Number(data.pot_amount),
      userId: String(data.user_id),
    } as Pool;
  });
  return poolObj;
};

const initialize = () => {
    return fireStoreInitialized();
};
