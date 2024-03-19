// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { Auth, User, getAuth as getAuthFromFirebase, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../infrastructure/firebase/firebaseConfig';

export const getAuth = () => {
    const app = initializeApp(firebaseConfig);
    return getAuthFromFirebase(app);
};

export const getUid = (setUid: (uid: string | null) => void, paramAuth?: Auth) => {
    const auth = paramAuth || getAuth();

    onAuthStateChanged(auth, (user) => {
        // console.log('start onAuthStateChanged');
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // const uid = user.uid;
            console.log('onAuthStateChanged: userGet');
            // console.log(user);
            setUid(user.uid);
            // ...
        }
    });
};
