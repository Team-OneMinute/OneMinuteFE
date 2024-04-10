// firebase
import { collection, query, orderBy, limit, where, getDocs, doc, increment, updateDoc } from 'firebase/firestore';
import { fireStoreInitialized } from '@/app/infrastructure/firebase/firestore';

/**
 * Fetch user
 * @param userId userId
 */
export const getUser = async (userId: string) => {
    const db = initialize();

    const userRef = collection(db, 'users');
    const q = query(userRef, where('user_id', '==', userId));

    const userSnap = await getDocs(q);
    const userFetchData = userSnap.docs.map((doc) => doc.data());

    const user = userFetchData.map((data) => {
        return {
            docNo: userSnap.docs[0].id,
            userId: String(data.user_id),
            name: String(data.name),
            life: Number(data.life),
            lifeNftTokenId: Number(data.life_nft_token_id),
            claimableReward: Number(data.claimable_reward),
            totalClaimed: Number(data.total_claimed),
            mailAddress: String(data.mail_address),
            walletAddress: String(data.wallet_address),
            characterNftFlg: Boolean(data.character_nft_flg),
        } as User;
    });

    return user[0];
};

export const decrementLife = async (docNo: string) => {
    const db = initialize();
    const userRef = doc(db, 'users', docNo);
    await updateDoc(userRef, {
        life: increment(-1),
    });
};

export const addClaimableReward = async (docNo: string, amount: number) => {
    const db = initialize();
    const userRef = doc(db, 'users', docNo);
    await updateDoc(userRef, {
        claimable_reward: increment(amount),
    });
};

export const setCharacterFlgInUser = async (docNo: string) => {
        const db = initialize();
        const userRef = doc(db, 'users', docNo);
        await updateDoc(userRef, {
            characterNftFlg: true,
        });
};

const initialize = () => {
    return fireStoreInitialized();
};
