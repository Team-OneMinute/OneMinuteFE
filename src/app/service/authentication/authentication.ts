// services
import { FirebaseAuthStore, Web3AuthStore } from '../../store/StoreProvider';
import { getUserAuth, signOutUser, userAuthInit } from './userAuthService';
import { getWalletAuth, logoutWallet, walletAuthInit } from './walletAuthService';
import { LoginStatus } from '@/app/types/LoginStatus';


export const loginStatus = (firebaseAuthStore: FirebaseAuthStore, web3AuthStore: Web3AuthStore) => {
    const firebaseAuth = firebaseAuthStore.state.firebaseAuth;
    const web3Auth = web3AuthStore.state.web3Auth;
    const isFirebaseFetching = firebaseAuthStore.state.isFetching;
    const isWeb3AuthConnecting = web3AuthStore.state.isConnecting;

    // page reload caused reFetching and reConnecting.
    // This timing is context data initializing.
    // So, not login status.
    if (isFirebaseFetching === true || isWeb3AuthConnecting == true) {
        console.log('is connecting');
        return LoginStatus.Connecting;
    }

    // not login user
    if (firebaseAuth === null || web3Auth == null) {
        console.log('no auth');
        return LoginStatus.Logout;
    } else if (firebaseAuth.currentUser === null || firebaseAuth.currentUser === undefined) {
        console.log('no current user');
        return LoginStatus.Logout;
    }

    // This app Login state is defined Multi-factor authentication
    // verification success is login status!
    if (firebaseAuth.currentUser.uid && firebaseAuth.currentUser.emailVerified == true) {
        console.log('is login now!!');
        return LoginStatus.Login;
    } else {
        console.log('not login other reason');
        return LoginStatus.Logout;
    }
};

export const signOutApp = async (firebaseAuthStore: FirebaseAuthStore, web3AuthStore: Web3AuthStore) => {
    if (firebaseAuthStore.state.firebaseAuth) {
        await signOutUser(firebaseAuthStore);
    }
    if (web3AuthStore.state.web3Auth) {
        await logoutWallet(web3AuthStore);
    }
};

export const initAuth = async (firebaseAuthStore: FirebaseAuthStore, web3AuthStore: Web3AuthStore) => {
    const userAuth = getUserAuth(firebaseAuthStore);
    const walletAuth = getWalletAuth(web3AuthStore);

    if (!userAuth) {
        userAuthInit(firebaseAuthStore);
        return;
    } else if (!walletAuth) {
        if (!userAuth.currentUser) {
            return;
        }
        await walletAuthInit(firebaseAuthStore, web3AuthStore, userAuth);
    }

};
