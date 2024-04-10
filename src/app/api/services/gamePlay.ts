// infrastructure
import { addTransaction } from '@/app/api/infrastructure/transaction';

// service
import { getUser } from '@/app/api/services/user';

// entity
import { CheckGamePlayStatus } from '@/app/api/entity/serviceCode';

export const checkPlay = async (uid: string) => {
    const userData = await getUser(uid);
    if (userData.lifeNftTokenId > 0) {
        // has life nft
        if (userData.life > 0) {
            return CheckGamePlayStatus.OK;
        } else {
            // userData.life <= 0
            return CheckGamePlayStatus.LIFE_IS_ZERO;
        }
    }
    // not has life nft
    return CheckGamePlayStatus.NFT_NOT_EXIST;
};

export const initializeGame = (uid: string, gameId: string) => {
    addTransaction(uid, gameId);
};
