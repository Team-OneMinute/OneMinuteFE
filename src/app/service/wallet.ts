import { getSmartWalletAddress } from "../infrastructure/api/wallet";

export const getSmartWallet = (uid: string) => {
    const result = getSmartWalletAddress(uid);
    return result;
}