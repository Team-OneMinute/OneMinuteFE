// firebase
import { collection, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

/**
 * Fetch active games limit number
 * @param limit number
 */
export const getTopWanted = async (limitNum: number) =>{
    const db = initialize();

    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, where("is_open", "==", true), orderBy("max_pot", "desc"), limit(limitNum));
    const querySnapshot = await getDocs(q);
    const gamesData = querySnapshot.docs.map(doc => doc.data());

    // TODO: userImageをblockchainから取得する
    // 暫定でpublicから取得
    const wantedList = gamesData.map(data => {
      return {
        gameId: String(data.id),
        userId: String(data.top_user_id),
        userImageUrl: "/static/images/temp/WantedSample.jpg",
        topAmount: data.max_pot,
        gameTitle: String(data.title),
        gameImageUrl: String(data.game_image_url),
        gameThumbnailUrl: String(data.thumbnail_url),
      } as Wanted;
    });
    return wantedList;
};

/**
 * GameがStartしてから最新のlimit件数を探す
 * @param limitNum 
 * @returns 
 */
export const getNewWanted = async (limitNum: number) =>{
  const db = initialize();

  const gamesRef = collection(db, 'games');
  const q = query(gamesRef, where("is_open", "==", true), orderBy("start", "desc"), limit(limitNum));

  const querySnapshot = await getDocs(q);
  const gamesData = querySnapshot.docs.map(doc => doc.data());

  // TODO: userImageをblockchainから取得する
  // 暫定でpublicから取得
  const wantedList = gamesData.map(data => {
    return {
      gameId: String(data.id),
      userId: String(data.top_user_id),
      userImageUrl: "/static/images/temp/WantedSample.jpg",
      topAmount: data.max_pot,
      gameTitle: String(data.title),
      gameImageUrl: String(data.game_image_url),
      gameThumbnailUrl: String(data.thumbnail_url),
    } as Wanted;
  });
  return wantedList;
};

/**
 * ユーザにとってHOTなゲーム draft
 * 
 * 条件

 * @param limitNum 
 */
export const getHotWanted = async (limitNum: number) =>{
  const db = initialize();

  const gamesRef = collection(db, 'games');
  const q = query(gamesRef, where("is_open", "==", true), orderBy("start", "desc"), limit(limitNum));

  const querySnapshot = await getDocs(q);
  const gamesData = querySnapshot.docs.map(doc => doc.data());

  // TODO: userImageをblockchainから取得する
  // 暫定でpublicから取得
  const wantedList = gamesData.map(data => {
    return {
      gameId: String(data.id),
      userId: String(data.top_user_id),
      userImageUrl: "/static/images/temp/WantedSample.jpg",
      topAmount: data.max_pot,
      gameTitle: String(data.title),
      gameImageUrl: String(data.game_image_url),
      gameThumbnailUrl: String(data.thumbnail_url),
    } as Wanted;
  });
  return wantedList;
} 

const initialize = () => {
    return fireStoreInitialized();
};

