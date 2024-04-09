import { Auth, getAuth, signOut } from 'firebase/auth';
import { FirebaseAuthAction, FirebaseAuthStore } from '../../store/StoreProvider';
import { Dispatch } from 'react';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '@/app/infrastructure/firebase/firebaseConfig';

export const signOutFirebaseAuth = async (firebaseAuthStore: FirebaseAuthStore) => {
    const firebaseAuth = firebaseAuthStore.state.firebaseAuth;
    const firebaseAuthDispatch = firebaseAuthStore.dispatch;
    if (!firebaseAuth) {
        return;
    }
    await signOut(firebaseAuth);
    firebaseAuthDispatch({ type: 'LOGOUT' });
};

export const fetchFirebaseAuth = (dispatch: Dispatch<FirebaseAuthAction>) => {
    dispatch({ type: 'REQUEST_FETCH' });
    const firebaseAuth = getAuthentication();
    console.log(firebaseAuth);
    dispatch({ type: 'FINISH_FETCH', payload: firebaseAuth });
};

export const setFirebaseAuth = (dispatch: Dispatch<FirebaseAuthAction>, firebaseAuth: Auth) => {
    // TODO: 本来isFetchingはそのままに、firebaseAuthの値だけ更新するREQUEST_SETなどを用意するのが正しい作り
    dispatch({ type: 'FINISH_FETCH', payload: firebaseAuth });
};

export const getAuthentication = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuth(app);
    return auth;
};
