'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';

// firebase
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// services & infra
import { StoreContext } from '@/app/store/StoreProvider';
import { initAuth, signOutApp } from '@/app/service/authentication/authentication';
import { getAuthentication, setFirebaseAuth } from '@/app/infrastructure/firebase/firebaseAuth';

type LoginStatus = 'logout' | 'login' | 'verify';

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const didLogRef = useRef<boolean>(false);

    const status = searchParams.get('status');
    const [isVerifyNavigation, setIsVerifyNavigation] = useState<boolean>(false);
    const [isFailedVerify, setIsFailedVerify] = useState<boolean>(false);

    const { firebaseAuthStore, web3AuthStore } = useContext(StoreContext);
    const firebaseAuthDispatch = firebaseAuthStore.dispatch;

    // reload add verify parameter
    const verifyCheck = () => {
        window.location.href = 'login?status=verifying';
    };

    useEffect(() => {
        if (didLogRef.current === false) {
            didLogRef.current = true;
        } else {
            console.log('login page useEffect start');
            const userAuth = getAuthentication();
            console.log(userAuth);
            firebase.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    // TODO: add session storage or local storage
                    if (user.emailVerified == false) {
                        console.log('send verify mail');
                        // TODO: change mail text
                        user.sendEmailVerification();
                        // TODO: add verify mail navigation
                        setIsVerifyNavigation(true);
                    } else {
                        console.log('success login');
                        // initAuth(firebaseAuthStore, web3AuthStore);
                        router.push('/');
                    }
                } else {
                    console.log('not registered');
                }
            });

            if (!status) {
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(userAuth);
                ui.start('#firebaseui-auth-container', {
                    callbacks: {
                        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                            // TODO: redirect TOP page
                            setFirebaseAuth(firebaseAuthDispatch, userAuth!);
                            return true;
                        },
                        uiShown: function () {
                            // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                            document.getElementById('loader')!.style.display = 'none';
                        },
                    },
                    signInOptions: [
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
            }
        }
    }, []);

    return (
        <Background>
            {isVerifyNavigation ? (
                <>
                    <TempDiv>メールを確認してください。メール確認後は以下のボタンを押してください。</TempDiv>
                    <TempDiv onClick={() => verifyCheck()}>Yes, I Verified !</TempDiv>
                    {isFailedVerify && <TempDiv2>まだ本人確認ができていません！</TempDiv2>}
                </>
            ) : (
                <div id='firebaseui-auth-container'>login Page</div>
            )}
            // TODO: change loading image
            <TempDiv id='loader'>Now Loading...</TempDiv>
            <TempDiv onClick={() => signOutApp(firebaseAuthStore, web3AuthStore)}> log out </TempDiv>
            <div onClick={() => router.push('/selectCharacter')}> select character </div>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;

const TempDiv = styled.div`
    color: #fff;
`;

const TempDiv2 = styled.div`
    color: #f00;
`;
