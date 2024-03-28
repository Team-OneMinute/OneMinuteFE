import { getUserData, setUserData } from '@/app/api/infrastructure/user';

export const getUser = async (uid: string) => {
    const userData = getUserData(uid);
    return userData;
};

export const setUserLifeAndPurchaseFlg = (uid: string) => {
    console.log('start update');
    const updateUserData = {
        life: 20,
        purchased_nft_flg: true,
    };
    setUserData(uid, updateUserData);
};
