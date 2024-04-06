import Web3Auth from "@web3auth/single-factor-auth";
import { connect, init, web3AuthOptions } from "../infrastructure/web3Auth/web3AuthConfig";
import { Dispatch } from "react";
import { FirebaseAuthAction, Web3AuthAction } from "./StoreProvider";
import { getAuthentication } from "../service/authentication";
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

export const connectWeb3Auth = async (dispatch: Dispatch<Web3AuthAction>, uid: string , idToken: string) => {
    dispatch({ type: "REQUEST_CONNECT" });

    const web3Auth = new Web3Auth(web3AuthOptions);
    await init(web3Auth).then(async (doneInitWeb3Auth) => {
        await connect(web3Auth, uid, idToken).then((result) => {
            dispatch({ type: 'FINISH_CONNECT', payload: web3Auth });
        });
    });
};
