import Web3Auth from "@web3auth/single-factor-auth";
import { connect, init, web3AuthOptions } from "../infrastructure/web3Auth/web3AuthConfig";
import { Dispatch } from "react";
import { FirebaseAuthAction, Web3AuthAction } from "./StoreProvider";
import { getAuthentication, getToken, logoutFirebase, logoutWeb3 } from "../service/authentication";
import { Auth } from "firebase/auth";

export const fetchFirebaseAuth = (dispatch: Dispatch<FirebaseAuthAction>) => {
    dispatch({ type: 'REQUEST_FETCH' });

    const firebaseAuth = getAuthentication();

    dispatch({ type: 'FINISH_FETCH', payload: firebaseAuth });
};

export const setFirebaseAuth = (dispatch: Dispatch<FirebaseAuthAction>, firebaseAuth: Auth) => {
    // TODO: 本来isFetchingはそのままに、firebaseAuthの値だけ更新するREQUEST_SETなどを用意するのが正しい作り
    dispatch({ type: 'FINISH_FETCH', payload: firebaseAuth });
}

export const logoutFirebaseAuth = async (dispatch: Dispatch<FirebaseAuthAction>, firebaseAuth: Auth) => {
    await logoutFirebase(firebaseAuth);
    dispatch({ type: 'LOGOUT' });
};

export const connectWeb3Auth = async (dispatch: Dispatch<Web3AuthAction>, uid: string , idToken: string) => {
    dispatch({ type: "REQUEST_CONNECT" });

    const web3Auth = new Web3Auth(web3AuthOptions);
    await init(web3Auth).then(async (doneInitWeb3Auth) => {
        await connect(web3Auth, uid, idToken).then((result) => {
            dispatch({ type: 'FINISH_CONNECT', payload: web3Auth });
        });
    });
};

export const logoutWeb3Auth = async (dispatch: Dispatch<Web3AuthAction>, web3Auth: Web3Auth) => {
    await logoutWeb3(web3Auth);
    dispatch({ type: 'LOGOUT' });
}

export const initAuth = async (
    firebaseAuthDispatch: Dispatch<FirebaseAuthAction>,
    web3AuthDispatch: Dispatch<Web3AuthAction>,
    firebaseAuth: Auth | null,
    web3Auth: Web3Auth | null
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


export const logoutAuth = async (
    firebaseAuthDispatch: Dispatch<FirebaseAuthAction>,
    web3AuthDispatch: Dispatch<Web3AuthAction>,
    firebaseAuth: Auth | null,
    web3Auth: Web3Auth | null
) => {
    // TODO: remove session storage
    if (firebaseAuth) {
        await logoutFirebaseAuth(firebaseAuthDispatch, firebaseAuth);
    }
    if (web3Auth) {
        await logoutWeb3Auth(web3AuthDispatch, web3Auth);
    }
    // removeCredentialStorage();
};
