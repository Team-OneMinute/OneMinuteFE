'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// services
import { getCredential, isLoginCheck, logout } from '@/app/service/authentication';
import { getUser } from '@/app/service/user';

// components
import { ButtonBase } from '@/app/component/Atoms/Button';

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState<User>();
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const credential = getCredential();
        setIsLogin(isLoginCheck(credential));

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
    }, []);

    const suggestLoginModal = () => {
        return (
            <>
                <div> not login now</div>
                <div onClick={() => router.push('/user')}> login page</div>
            </>
        );
    };

    return (
        <>
            <Background>
                {isLogin === false && suggestLoginModal()}
                {isLogin && (
                    <>
                        <HeaderArea>
                            <LogoutButtonArea>
                                <ButtonBase text='Logout' onClick={logout} />
                            </LogoutButtonArea>
                        </HeaderArea>
                        <MainArea>
                            <ImgArea src='/static/images/temp/User4.png'></ImgArea>
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