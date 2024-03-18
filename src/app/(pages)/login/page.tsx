'use client';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../infrastructure/firebase/firebaseConfig';

export default function LoginPage() {
    const initialize = () => {
        return firebase.initializeApp(firebaseConfig);
    };

    // firebase.auth();
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(getAuth(initialize()));
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            },
        ],
        // Other config options...
    });
    return (
        <div id="firebaseui-auth-container">login Page</div>
    );
}
