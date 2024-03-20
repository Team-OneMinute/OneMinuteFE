'use client';
import firebase from 'firebase/compat/app';
import { Auth, signOut, User as AuthUser, getAuth as getAuthFromFirebase, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useEffect } from 'react';
import { getAuthentication, logout } from '@/app/service/authentication';
import { userCredential } from '@/app/service/credential';

const { removeCredentialStorage } = userCredential();

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {

    useEffect(() => {
        const auth = getAuthentication();
        firebase.auth().onAuthStateChanged((user) => {
            console.log('authentication');
            if (user != null) {
                // TODO: add session storage or local storage
                if (user.emailVerified == false) {
                    console.log('send verify mail');
                    console.log(user);
                    // MEMO: https://qiita.com/mml/items/5e325bb19ba532ca56b7
                    // TODO: change password mail text
                    user.sendEmailVerification();
                    // TODO: add verify mail navigation
                } else {
                    console.log('success login');
                    console.log(user);
                }
            } else {
                console.log('not registered');
            }
        });

        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // TODO: redirect TOP page
                    return true;
                },
                uiShown: function () {
                    // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                    document.getElementById('loader')!.style.display = 'none';
                },
            },
            signInSuccessUrl: '/', // This is where should redirect if the sign in is successful.
            signInOptions: [
                    // TODO: add twitter
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            ],
            tosUrl: 'https://www.example.com/terms-conditions', // URL to you terms and conditions.
            privacyPolicyUrl: function () {
                // TODO: add regal policy
                window.location.assign('https://www.example.com/privacy-policy');
            },
        });
    }, []);

    return (
        <div>
            <div id='firebaseui-auth-container'>login Page</div>
            // TODO: change loading image
            <div id='loader'>Now Loading...</div>
            <div onClick={() => logout()}> log out </div>
        </div>
    );
}
