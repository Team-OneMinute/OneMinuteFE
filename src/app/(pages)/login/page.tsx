'use client';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from '@/app/service/auth';
import { useEffect } from 'react';

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {
    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

        ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    // Action if the user is authenticated successfully
                    return true;
                },
                uiShown: function () {
                    // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                    document.getElementById('loader')!.style.display = 'none';
                },
            },
            signInSuccessUrl: 'https://localhost/', // This is where should redirect if the sign in is successful.
            signInOptions: [
                // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
                    requireDisplayName: true,
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
            <div id="loader">Now Loading...</div>
        </div>
    );
}
