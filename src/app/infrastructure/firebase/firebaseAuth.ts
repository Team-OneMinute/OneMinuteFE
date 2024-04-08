import { Auth, getAuth, signOut } from "firebase/auth";
import { FirebaseAuthAction, FirebaseAuthStore, Web3AuthAction } from '../../store/StoreProvider';
import { Dispatch } from 'react';

export const getAuthUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    return user;
}

export const signOutFirebaseAuth = async (firebaseAuthStore: FirebaseAuthStore) => {
    const firebaseAuth = firebaseAuthStore.state.firebaseAuth;
    const firebaseAuthDispatch = firebaseAuthStore.dispatch;
    if (!firebaseAuth) {
        return;
    }
    await signOut(firebaseAuth);
    firebaseAuthDispatch({ type: 'LOGOUT' });
};
