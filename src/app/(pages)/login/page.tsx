'use client';
import firebase from 'firebase/compat/app';
import { Auth, signOut, User as AuthUser, getAuth as getAuthFromFirebase, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useEffect } from 'react';
import { getAuthentication } from '@/app/service/authentication';
import { userCredential } from '@/app/service/credential';

const { removeCredentialStorage } = userCredential();

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {
    const logout = async () => {
        // TODO: remove session storage
        const auth = getAuthentication();
        await signOut(auth);
        removeCredentialStorage();
    };

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
                    // Action if the user is authenticated successfully
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
                // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    //signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                },
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
            <div id='loader'>Now Loading...</div>
            <div onClick={() => logout()}> log out </div>
        </div>
    );
}
