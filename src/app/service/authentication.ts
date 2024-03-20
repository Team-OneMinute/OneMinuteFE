// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { Auth, User as AuthUser, getAuth as getAuthFromFirebase, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../infrastructure/firebase/firebaseConfig';

// export const getAuth = () => {
//     const app = initializeApp(firebaseConfig);
//     return getAuthFromFirebase(app);
// };

export const getAuthentication = () => {
    const app = firebase.initializeApp(firebaseConfig);
    const auth = getAuthFromFirebase(app);
    return auth;
};

export const authInitialize = (setAuthUser: (user: AuthUser) => void, paramAuth?: Auth) => {
    const auth = paramAuth || getAuthentication();

    onAuthStateChanged(auth, (user) => {
        // console.log('start onAuthStateChanged');
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // const uid = user.uid;
            console.log('onAuthStateChanged: userGet');
            // console.log(user);
            setAuthUser(user);
        }
    });
};

export const isLogin = (user: AuthUser | null | undefined) => {
    if (user === null || user === undefined) {
        console.log('step1');
        return false;
    } else if (user.uid && user.emailVerified == true) {
        console.log('step2');
        return true;
    }
    console.log('step3');
    return false;
};
