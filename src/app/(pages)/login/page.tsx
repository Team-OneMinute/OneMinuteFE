'use client';
import { useEffect } from 'react';
import styled from 'styled-components';

// firebase
import firebase from 'firebase/compat/app';
import { getIdToken, Auth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// services
import { getAuthentication, logout } from '@/app/service/authentication';
import { useRouter } from 'next/navigation';
import { walletLogin } from '@/app/service/wallet';

// tmp
import { connectWeb3Auth } from '@/app/infrastructure/web3Auth/web3AuthConfig' 

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {
    const router = useRouter();

    // const loginWallet = async (auth: Auth) => {
    //     console.log('start login wallet');
    //     const user = auth.currentUser;
    //     console.log(user);
    //     if (user == null) {
    //         return;
    //     }
    //     const idToken = await getIdToken(user, true);
    //     connectWeb3Auth(user.uid, idToken);
    //     console.log('idToken');
    //     console.log(idToken);
    // };

    useEffect(() => {
        const auth = getAuthentication();
        firebase.auth().onAuthStateChanged((user) => {
            console.log('authentication');
            console.log(user);
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
                    console.log('success login method');
                    //loginWallet(auth);
                    walletLogin(auth);
                    return true;
                },
                uiShown: function () {
                    // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                    document.getElementById('loader')!.style.display = 'none';
                },
            },
            //signInSuccessUrl: '/', // This is where should redirect if the sign in is successful.
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
        <Background>
            <div id='firebaseui-auth-container'>login Page</div>
            // TODO: change loading image
            <div id='loader'>Now Loading...</div>
            <div onClick={() => logout()}> log out </div>
            <div onClick={() => router.push('/selectCharacter')}> select character </div>
            <div onClick={() => logout()}> log out </div>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;
