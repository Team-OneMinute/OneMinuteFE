// infrastructure
import { getSnapByDocKey } from '@/app/api/infrastructure/firestore/firestore';

const collectionId = 'users';

export const getUserData = async (uid: string) => {
    const userSnap = await getSnapByDocKey(collectionId, uid);
    const userData: User = {
        docNo: String(userSnap!.user_id),
        userId: String(userSnap!.user_id),
        name: String(userSnap!.name),
        life: Number(userSnap!.life),
        claimableReward: Number(userSnap!.claimable_reward),
        totalClaimed: Number(userSnap!.total_claimed),
        mailAddress: String(userSnap!.mail_address),
        purchasedNftFlg: Boolean(userSnap!.purchased_nft_flg),
    };
    return userData;
};