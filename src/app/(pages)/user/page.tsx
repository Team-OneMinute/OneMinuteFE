'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// services
import { loginStatus, signOutApp } from '@/app/service/authentication/authentication';
import { getUser } from '@/app/service/user';
import { getMyCharacter } from '@/app/service/character';

// components
import { ButtonBase } from '@/app/component/Atoms/Button';
import { StoreContext } from '@/app/store/StoreProvider';
import { initAuth } from '@/app/service/authentication/authentication';
// Type
import { LoginStatus } from '@/app/types/LoginStatus';

export default function UserPage() {
    const router = useRouter();
    const didLogRef = useRef<boolean>(false);

    const [user, setUser] = useState<User>();

    const { firebaseAuthStore, web3AuthStore } = useContext(StoreContext);
    const isFirebaseFetching = firebaseAuthStore.state.isFetching;
    const web3Auth = web3AuthStore.state.web3Auth;
    const isWeb3AuthConnecting = web3AuthStore.state.isConnecting;
    const isFetching = isFirebaseFetching || isWeb3AuthConnecting;

    // console.log("user page start");
    // console.log(web3Auth);
    // console.log(web3Auth.sessionId);

    useEffect(() => {
        if (didLogRef.current === false) {
            didLogRef.current = true;
        } else {
            console.log('user page useEffect start');
            if (!isFetching) {
                (async () => {
                    await initAuth(firebaseAuthStore, web3AuthStore);
                })();
            }
            // initWeb3Auth(web3AuthState);
            // const credential = getCredential();
            // setIsLogin(isLoginCheck(credential));

            // FIXME:ユーザ認証ができるまで、userId固定
            // firebase function ができたら、コメント消して処理消す
            // if (credential) {
            //     const userData = await getUser(credential.uid);
            //     await setUser(userData);
            // }
            const userId = '0001A';
            (async () => {
                const userData = await getUser(userId);
                await setUser(userData);
            })();
            console.log('user page useEffect end');
        }
    }, []);

    const loginHandler = () => {
        const status = loginStatus(firebaseAuthStore, web3AuthStore);
        console.log(status);
        switch (status) {
            case LoginStatus.Login:
                return true;
            case LoginStatus.Logout:
                return false;
            default:
                return false;
        }
    };
    const logoutClick = () => {
        // TODO: change isLogin
        if (web3Auth) {
            signOutApp(firebaseAuthStore, web3AuthStore);
            router.push('/');
        }
    };

    return (
        <>
            <Background>
                {loginHandler() ? (
                    <>
                        <HeaderArea>
                            <LogoutButtonArea>
                                <ButtonBase text='Logout' onClick={logoutClick} />
                            </LogoutButtonArea>
                        </HeaderArea>
                        <MainArea>
                            <ImgArea src='/static/images/temp/character/character0.png'></ImgArea>
                            <InfoArea>
                                <SubTitle>Name</SubTitle>
                                <Text>Bob</Text>
                                <SubTitle>Mail</SubTitle>
                                <Text>test@example.com</Text>
                                <SubTitle>Total Reward</SubTitle>
                                <Text>$1,000</Text>
                                <SubTitle>Claimable Reward</SubTitle>
                                <Text>$250</Text>
                            </InfoArea>
                        </MainArea>
                        <HistoryArea>
                            <SubTitle>History</SubTitle>
                        </HistoryArea>
                        {/* <div onClick={() => getNftData()}>data fetch</div> */}
                    </>
                ) : (
                    <>
                        <div> not login now</div>
                        <div onClick={() => router.push('/user')}> login page</div>
                    </>
                )}
            </Background>
        </>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;

const HeaderArea = styled.div`
    width: 100%;
    height: 10%;
`;

const LogoutButtonArea = styled.div`
    width: 30%;
    height: 5%;
    position: absolute;
    right: 5%;
    top: 1%;
`;

const MainArea = styled.div`
    width: 100%;
    height: 45%;
    display: flex;
`;

const ImgArea = styled.img`
    width: 50%;
    height: 100%;
`;

const InfoArea = styled.div`
    width: 50%;
    height: 100%;
    margin: 3%;
`;

const TotalReward = styled.div`
    width: 100%;
    height: 20%;
`;

const ClaimableReward = styled.div`
    width: 100%;
    height: 20%;
`;

const Name = styled.div`
    width: 100%;
    height: 20%;
`;

const MailAddress = styled.div`
    width: 100%;
    height: 20%;
`;

const HistoryArea = styled.div`
    width: 100%;
    height: 40%;
    margin-top: 5%;
`;

const SubTitle = styled.div`
    color: white;
    font-weight: bold;
`;

const Text = styled.div`
    color: white;
    margin: 3%;
`;
