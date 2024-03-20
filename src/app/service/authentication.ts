// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { Auth, User as AuthUser, getAuth as getAuthFromFirebase, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../infrastructure/firebase/firebaseConfig';

// services
import { userCredential } from '@/app/service/credential';

const { getCredentialStorage, setCredentialStorage } = userCredential();

export const getAuthentication = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuthFromFirebase(app);
    return auth;
};

export const authInitialize = (paramAuth?: Auth) => {
    const auth = paramAuth || getAuthentication();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('onAuthStateChanged: userGet');
            // TODO: change secure code
            const userCredential = getCredentialStorage();
            if (userCredential == null || user.uid != userCredential.uid) {
                setCredentialStorage({
                    uid: user.uid,
                    isLogin: isLogin(user),
                });
            }
        }
    });
};

export const isLogin = (user: AuthUser | null | undefined) => {
    if (user === null || user === undefined) {
        return false;
    } else if (user.uid && user.emailVerified == true) {
        return true;
    }
    return false;
};

export const getCredential = () => {
    return getCredentialStorage();
}