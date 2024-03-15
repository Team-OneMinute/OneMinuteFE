// firebase
import { collection, query, orderBy, limit, where, getDocs, doc, increment, updateDoc } from 'firebase/firestore';
import { fireStoreInitialized } from "../infrastructure/firebase/firestore"

/**
 * Fetch user
 * @param userId userId
 */
export const getUser = async (userId: string) =>{
    const db = initialize();

    const userRef = collection(db, 'users');
    const q = query(userRef, where("user_id", "==", userId));

    const userSnap = await getDocs(q);
    const userFetchData = userSnap.docs.map(doc => doc.data());

    const user = userFetchData.map(data => {
      return {
        docNo: userSnap.docs[0].id,
        userId: String(data.user_id),
        name: String(data.name),
        life: Number(data.life),
      } as User;
    });

    return user;
};

export const decrementLife = async (docNo: string) => {
  const db = initialize();
  const userRef = doc(db, "users", docNo);
  await updateDoc(
    userRef, 
    {
      life: increment(-1)
    });
}


const initialize = () => {
    return fireStoreInitialized();
};
