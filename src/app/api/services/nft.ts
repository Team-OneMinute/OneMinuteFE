// infrastructure
import { gasLessCall } from '@/app/api/infrastructure/gelato/gassLessCall';
import { setUserWalletAddress } from './user';

export const mintCharacterNft = async (uid: string, walletAddress: string, imageUrl: string) => {
    // TODO: into const file
    if (!checkIdImage(imageUrl)) throw new Error('imageUrl invalid error');

    // TODO: add .env file
    const targetNftContract = '0x093d8549D8cBcF5844B23f508ac2c1687E92862D';
    const chinId = 6038361;
    const res = await gasLessCall(walletAddress, targetNftContract, chinId);
    setUserWalletAddress(uid, walletAddress);
    return res;
};

const checkIdImage = (imageUrl: string) => {
    // TODO: check white list check
    return true;
};