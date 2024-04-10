// infrastructure
import { getSnapByDocKey, updateDocument } from '@/app/api/infrastructure/firestore/firestore';

const collectionId = 'users';

export const getUserData = async (uid: string) => {
    const userSnap = await getSnapByDocKey(collectionId, uid);
    const userData: User = {
        docNo: String(userSnap!.user_id),
        userId: String(userSnap!.user_id),
        name: String(userSnap!.name),
        life: Number(userSnap!.life),
        lifeNftTokenId: Number(userSnap!.life_nft_token_id),
        claimableReward: Number(userSnap!.claimable_reward),
        totalClaimed: Number(userSnap!.total_claimed),
        mailAddress: String(userSnap!.mail_address),
        walletAddress: String(userSnap!.wallet_address),
        characterNftFlg: Boolean(userSnap!.character_nft_flg),
    };
    return userData;
};

export const setUserData = (uid: string, updateUserData: any) => {
    // TODO: add error handling
    const result = updateDocument(collectionId, uid, updateUserData);
}
