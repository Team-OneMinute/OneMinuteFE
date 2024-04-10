import { connectWeb3Auth, logoutWeb3Auth } from '@/app/infrastructure/web3Auth/web3Auth';
import { Web3AuthStore, FirebaseAuthStore } from '../../store/StoreProvider';
import { getToken } from './userAuthService';
import { Auth } from 'firebase/auth';


export const logoutWallet = async (web3AuthStore: Web3AuthStore) => {
    await logoutWeb3Auth(web3AuthStore);
};

export const getWalletAuth = (web3AuthStore: Web3AuthStore) => {
    return web3AuthStore.state.web3Auth;
};

export const walletAuthInit = async (firebaseAuthStore: FirebaseAuthStore, web3AuthStore: Web3AuthStore, userAuth: Auth) => {
    const uid = userAuth.currentUser?.uid;
    const idToken = await getToken(firebaseAuthStore);

    if (!uid) {
        return;
    }
    try {
        invalidCheck(uid, idToken);
    } catch (err) {
        throw new Error('Invalid wallet authentication init.');
    }
    connectWeb3Auth(web3AuthStore, uid!, idToken!);
};

const invalidCheck = (uid: string | null, idToken: string | null) => {
    if (!uid || !idToken) throw new Error("Invalid args.");
    return true;
};
