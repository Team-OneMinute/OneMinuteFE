'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

// services
import { getCredential, isLoginCheck, logout } from '@/app/service/authentication';
import { getUser } from '@/app/service/user';

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
                <h1>User Page</h1>
                <div onClick={() => logout()}>log out</div>
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
