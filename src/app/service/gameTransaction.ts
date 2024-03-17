// firebase
import { collection, query, orderBy, limit, where, getDocs, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

// util
import { dateFormatForString } from '../utils/date'; 

/**
 * add game transaction.
 * docs name rule: {gameId}_{userId}_{YYYYMMDDHHmmss}
 * Game started date is serverTimestamp
 * @param gameId 
 * @param userId 
 */
export const setTransaction = async (gameId: string, userId: string) => {
  const db = initialize();
  const now: string = dateFormatForString(new Date());
  console.log(now);

  const gameTransactionDocRef = doc(
    db,
    `${gameId}_game_transactions`,
    `${gameId}_${userId}_${now}`);

  await setDoc(gameTransactionDocRef, {
      userId: userId,
      startDate: serverTimestamp(),
  });
}

const initialize = () => {
    return fireStoreInitialized();
};
