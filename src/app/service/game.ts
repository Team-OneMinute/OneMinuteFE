// firebase
import { collection, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

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

const initialize = () => {
    return fireStoreInitialized();
};
