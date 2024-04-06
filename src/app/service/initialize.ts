import { Web3Auth } from "@web3auth/single-factor-auth";
import { Auth } from "firebase/auth";
import { getToken } from './authentication';
import { connectWeb3Auth, fetchFirebaseAuth } from "../store/StoreService";
import { FirebaseAuthAction, Web3AuthAction } from "../store/StoreProvider";
import { Dispatch } from 'react';

export const initAuth = async (
    firebaseAuthDispatch: Dispatch<FirebaseAuthAction>,
    web3AuthDispatch: Dispatch<Web3AuthAction>,
    firebaseAuth: Auth | null,
    web3Auth: Web3Auth | null,
) => {
    if (!web3Auth) {
        if (!firebaseAuth) {
            fetchFirebaseAuth(firebaseAuthDispatch);
            return;
        }
        // TODO: fetch高速化のため、今後セッションストレージから値を取得する
        // authInitialize(firebaseAuth);
        // const credential = getCredentialStorage();
        // if (!credential) {
        //     return;
        // }
        // const uid = credential.uid;
        const firebaseAuthUser = firebaseAuth.currentUser;
        if (!firebaseAuthUser) {
            return;
        }
        const uid = firebaseAuthUser.uid;
        const idToken = await getToken(firebaseAuthUser);
        connectWeb3Auth(web3AuthDispatch, uid, idToken);
    }
};