'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// firebase
import firebase from 'firebase/compat/app';
import { getIdToken, Auth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// services
import { getAuthUser, getAuthentication } from '@/app/service/authentication/authentication';
import { useRouter, useSearchParams } from 'next/navigation';
import { walletLogin } from '@/app/service/wallet';

// tmp
import { connect } from '@/app/infrastructure/web3Auth/web3Auth';
import { StoreContext } from '@/app/store/StoreProvider';
import { initAuth, setFirebaseAuth } from '@/app/store/StoreService';

type LoginStatus = 'logout' | 'login' | 'verify';

// TODO: メールリンク認証によって飛んでくるメールのテンプレート変更
export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const didLogRef = useRef<boolean>(false);

    const status = searchParams.get('status');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isFailedVerify, setIsFailedVerify] = useState<boolean>(false);

    const { firebaseAuthStore, web3AuthStore } = useContext(StoreContext);
    const firebaseAuth = firebaseAuthStore.state.firebaseAuth;
    const isFirebaseFetching = firebaseAuthStore.state.isFetching;
    const firebaseAuthDispatch = firebaseAuthStore.dispatch;
    const web3Auth = web3AuthStore.state.web3Auth;
    const isWeb3AuthConnecting = web3AuthStore.state.isConnecting;
    const web3AuthDispatch = web3AuthStore.dispatch;
    const isFetching = isFirebaseFetching || isWeb3AuthConnecting;

    const loginWallet = async (auth: Auth) => {
        console.log('start login wallet');
        const user = auth.currentUser;
        console.log(user);
        if (user == null) {
            return;
        }
        const idToken = await getIdToken(user, true);
        // await initWeb3Auth(web3Auth).then(async (doneInitWeb3Auth) => {
        //     await connectWeb3Auth(web3Auth, user.uid, idToken);
        //     // console.log(web3Auth);
        // });
        await connect(web3Auth!, user.uid, idToken);
        console.log('idToken');
        console.log(idToken);
    };

    const verifyCheck = () => {
        // router.push('/login?status=verifying');
        window.location.href = 'login?status=verifying';
        // window.location.reload();
        // router.push('/login?verifying'); // FIXME: 最新のverifyの値取得できず、top画面に戻れないバグ発生中。画面更新なりをして最新のverifyの値を取得できるようにする。暫定対処として強制top画面遷移
        // verifyを取得
        // const authUser = getAuthUser();
        // const isVerify = firebaseAuth?.currentUser?.emailVerified;
        // if (isVerify) {
        //     router.push('/');
        // } else {
        //     setIsFailedVerify(true);
        // }
    };

    useEffect(() => {
        if (didLogRef.current === false) {
            didLogRef.current = true;
        } else {
            const auth = getAuthentication();
            // const auth = firebaseAuthState.firebaseAuth;
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
                        setIsLogin(true);
                    } else {
                        console.log('success login');
                        console.log(user);
                        router.push('/');
                    }
                } else {
                    console.log('not registered');
                }
            });

            if (!status) {
                const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
                ui.start('#firebaseui-auth-container', {
                    callbacks: {
                        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                            // TODO: redirect TOP page
                            console.log('success login method');
                            setFirebaseAuth(firebaseAuthDispatch, auth);
                            initAuth(firebaseAuthDispatch, web3AuthDispatch, firebaseAuth, web3Auth);
                            // loginWallet(auth);
                            //walletLogin(auth);
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
            }
        }
    }, []);

    return (
        <Background>
            {!isLogin ? (
                <div id='firebaseui-auth-container'>login Page</div>
            ) : (
                <>
                    <TempDiv>メールを確認してください。メール確認後は以下のボタンを押してください。</TempDiv>
                    <TempDiv onClick={() => verifyCheck()}>Yes, I Verified !</TempDiv>
                    {isFailedVerify && <TempDiv2>まだ本人確認ができていません！</TempDiv2>}
                </>
            )}
            // TODO: change loading image
            <TempDiv id='loader'>Now Loading...</TempDiv>
            {/* <TempDiv onClick={() => logout(web3Auth)}> log out </TempDiv> */}
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
