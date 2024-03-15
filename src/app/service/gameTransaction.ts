// firebase
import { collection, query, orderBy, limit, where, getDocs, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

// util
import { dateFormatForString } from '../utils/date'; 

/**
 * Fetch active games limit number
 * @param limit number
 */
export const getAllActiveGames = async () =>{
    const db = initialize();

    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where("is_open", "==", true), orderBy("max_pot", "desc"));

    const gameSnap = await getDocs(q);
    const gamesData = gameSnap.docs.map(doc => doc.data());

    const gameList = gamesData.map(data => {
      return {
        gameId: String(data.id),
        gameTitle: String(data.title),
        gameDetail: String(data.game_detail),
        gameImageUrl: String(data.game_image_url),
        gameThumbnailUrl: String(data.thumbnail_url),
        topAmount: Number(data.max_pot),
        topUserId: String(data.top_user_id),
        isOpen: Boolean(data.is_open),
        start: data.start
      } as Game;
    });
    return gameList;
};

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
