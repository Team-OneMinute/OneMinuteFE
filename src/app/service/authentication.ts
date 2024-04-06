// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import {
    getIdToken,
    Auth,
    signOut,
    User as AuthUser,
    getAuth as getAuthFromFirebase,
    onAuthStateChanged,
    User,
} from 'firebase/auth';
import { firebaseConfig } from '@/app/infrastructure/firebase/firebaseConfig';

// services
import { getCredentialStorage, setCredentialStorage, removeCredentialStorage } from '@/app/service/credential';
import { logout } from '../infrastructure/web3Auth/web3AuthConfig';
import Web3Auth from '@web3auth/single-factor-auth';
import { Dispatch } from 'react';
import { FirebaseAuthAction, Web3AuthAction } from '../store/StoreProvider';
import { connectWeb3Auth, fetchFirebaseAuth, logoutFirebaseAuth } from '../store/StoreService';
import { signOutFirebaseAuth } from '../infrastructure/firebase/firebaseAuth';

export const getAuthentication = () => {
    console.log('in getAuthentication');
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuthFromFirebase(app);
    return auth;
};

export const authInitialize = (paramAuth: Auth) => {
    const auth = paramAuth;

    // get user credential from firebase authentication
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('onAuthStateChanged: userGet');
            console.log(user);
            // TODO: change secure code
            const userCredential = getCredentialStorage();
            if (
                userCredential == null ||
                user.uid != userCredential.uid ||
                user.emailVerified != userCredential.isLogin
            ) {
                setCredentialStorage({
                    uid: user.uid,
                    isLogin: isLoginSuccess(user),
                });
                // return user;
            }
        }
    });
};

export const isLoginSuccess = (user: AuthUser): boolean => {
    return !!(user.uid && user.emailVerified == true);
};

export const isLoginCheck = (credential: UserCredential | undefined) => {
    if (!credential) {
        return false;
    }
    return credential.isLogin;
};

export const getCredential = () => {
    return getCredentialStorage();
};

export const logoutFirebase = async (firebaseAuth: Auth) => {
    await signOutFirebaseAuth(firebaseAuth);
}

export const logoutWeb3 = async (web3Auth: Web3Auth) => {
    await logout(web3Auth);
}

export const getToken = async (user: User) => {
    const token = await getIdToken(user, true);
    return token;
};

export const getAuthUser = (paramAuth?: Auth): AuthUser | null => {
    const auth = paramAuth || getAuthentication();
    console.log(auth);
    const user = auth.currentUser;
    console.log(user);
    return user;
};
