// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getIdToken, Auth, signOut, User as AuthUser, getAuth as getAuthFromFirebase, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseConfig } from '@/app/infrastructure/firebase/firebaseConfig';

// services
import {
    getCredentialStorage,
    setCredentialStorage,
    removeCredentialStorage,
} from '@/app/service/credential';
import { logoutWeb3Auth } from '../infrastructure/web3Auth/web3AuthConfig';

export const getAuthentication = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuthFromFirebase(app);
    return auth;
};

export const authInitialize = (paramAuth?: Auth) => {
    const auth = paramAuth || getAuthentication();

    // get user credential from firebase authentication
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('onAuthStateChanged: userGet');
            // TODO: change secure code
            const userCredential = getCredentialStorage();
            if (userCredential == null || user.uid != userCredential.uid) {
                setCredentialStorage({
                    uid: user.uid,
                    isLogin: isLoginSuccess(user),
                });
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

export const logout = async () => {
    // TODO: remove session storage
    const auth = getAuthentication();
    await signOut(auth);
    await logoutWeb3Auth();
    removeCredentialStorage();
};

export const getToken = async (user: User) => {
    const token = await getIdToken(user, true);
    return token;
};