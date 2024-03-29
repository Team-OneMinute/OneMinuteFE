// infrastructure
import { fetchNft } from '@/app/api/infrastructure/crossmint/nft/nft';
import { addTransaction } from '@/app/api/infrastructure/transaction';

// service
import { getUser, setUserLifeAndPurchaseFlg } from '@/app/api/services/user';

// entity
import { CheckGamePlayStatus } from '@/app/api/entity/serviceCode';

export const checkPlay = async (uid: string) => {
    const userData = await getUser(uid);
    if (userData.purchasedNftFlg === true && userData.life > 0) {
        return CheckGamePlayStatus.OK;
    } else if (userData.purchasedNftFlg === true && userData.life <= 0) {
        return CheckGamePlayStatus.LIFE_IS_ZERO;
    } else {
        // userData.purchasedNftFlg === false
        const nftData = await fetchNft(userData.mailAddress);
        if (hasLifeNft(nftData)) {
            setUserLifeAndPurchaseFlg(uid);
            return CheckGamePlayStatus.OK;
        }
    }
    return CheckGamePlayStatus.NFT_NOT_EXIST;
};

export const initializeGame = (uid: string, gameId: string) => {
    addTransaction(uid, gameId);
};

const hasLifeNft = (nfts: any[]) => {
    // TODO: into env file
    const NFT_CONTRACT_ADDRESS_LIFE = '0x0FC4edC21C089714f5B8e5510D402865137f68e9';
    console.log(nfts);
    return nfts.some((nftData) => nftData.contractAddress == NFT_CONTRACT_ADDRESS_LIFE);
};
