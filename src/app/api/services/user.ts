import { getUserData, setUserData } from '@/app/api/infrastructure/user';

export const getUser = async (uid: string) => {
    const userData = getUserData(uid);
    return userData;
};

export const setUserLifeNft = (uid: string, tokenId: number) => {
    console.log('start setUserLifeNftAndPurchaseFlg');
    const updateUserData = {
        life: 20,
        life_nft_token_id: tokenId,
    };
    setUserData(uid, updateUserData);
};

export const setUserWalletAddress = (uid: string, address: string) => {
    console.log('start setUserWalletAddress');
    const updateUserData = {
        wallet_address: address,
    };
    setUserData(uid, updateUserData);
};
