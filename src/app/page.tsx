'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { NAVIGATION_AREA_HEIGHT, USER_AREA_HEIGht, USER_AREA_MARGIN, USER_NFT_IMAGE_SIZE } from './styles';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';

// services
import { getAllActiveGames } from './service/game';
import { getPoolsForObj } from './service/pool';
import { getUser } from './service/user';
import { authInitialize, getCredential } from './service/authentication';

// slides
import AllGamesSlide from './slides/AllGameSlide';
import GameGenreSlide from './slides/GameGenreSlide';
import { getGameScoreForObj } from './service/score';
import GameDetailModal from './component/GameDetailModal';

const pageName = ['ALL', 'ACTION', 'BATTLE', 'SHOOTING', 'PUZZLE'];

export default function App() {
    // TODO: 右スワイプでゲーム画面に戻れる問題あり
    const router = useRouter();
    const [games, setGames] = useState<Game[]>([]);
    const [rankings, setRankings] = useState<Score[]>([]);
    const [pools, setPools] = useState<Pool[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
    const [credential, setCredential] = useState<UserCredential | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: any) {
            return `<div class="${className}"> ${pageName[index]} </div>`;
        },
    };

    const closeDetailModal = useCallback(() => {
        setIsOpenDetailModal(false);
    }, []);

    const topPageInitialized = async (): Promise<void> => {
        authInitialize();

        // fetch from database
        const gameList = await getAllActiveGames();
        const sortedGameList = await gameList.sort((a, b) => a.topAmount - b.topAmount);
        await setGames(sortedGameList);
        if (games.length > 0) {
            setSelectedGameId(games[0].gameId);
        }

        setInitialized(true);
    };

    const afterInitialized = () => {
        console.log('initialized started');
        if (initialized == true) {
            // credential init
            console.log('credential check start');
            const tmpCredential = getCredential();
            console.log('credential');
            console.log(tmpCredential);
            if (tmpCredential != null) {
                // TODO: log in dev environments only
                setCredential(tmpCredential);
            }

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

            // TODO: other game fetch and add store
        }
    };

    // initialize
    useEffect(() => {
        console.log('use effect');
        topPageInitialized();
    }, []);

    // after initialized
    useEffect(() => {
        afterInitialized();
    }, [initialized]);

    // TODO: いるかこれ
    useEffect(() => {
        if (games.length > 0) {
            setSelectedGameId(games[0].gameId);
        }
    }, [games]);

    useEffect(() => {
        (async () => {
            // TODO: add data in store or storage
            // TODO: add delay fetch for gating other game data, and add store or storage.
            // TODO: add emergencyGame flg, when release or fatal error. Prevent game selection.
            if (selectedGameId) {
                const poolList = await getPoolsForObj(selectedGameId);
                const rankingList = await getGameScoreForObj(selectedGameId);
                setRankings(rankingList.sort((a, b) => a.score - b.score));

                setPools(poolList); // already sorted by top amount
            }
        })();
    }, [selectedGameId]);

    return (
        <>
            <SwiperContainer>
                <HeaderArea>
                    <UserArea>
                        <UserNftImg src='/static/images/temp/tmpUser.png' />
                        <UserTotalAmount>$1000</UserTotalAmount>
                    </UserArea>
                    <LoginArea onClick={() => router.push('/login')}>ログイン</LoginArea>
                </HeaderArea>
                <Swiper pagination={pagination} modules={[Pagination]}>
                    <SwiperSlide>
                        <AllGamesSlide
                            games={games}
                            rankings={rankings}
                            pools={pools}
                            selectedGameId={selectedGameId}
                            setSelectedGameId={setSelectedGameId}
                            setIsOpenDetailModal={setIsOpenDetailModal}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GameGenreSlide pageName='Action Slide' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GameGenreSlide pageName='Battle Slide' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GameGenreSlide pageName='Shooting Slide' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GameGenreSlide pageName='Puzzle Slide' />
                    </SwiperSlide>
                </Swiper>
            </SwiperContainer>
            {isOpenDetailModal && (
                <GameDetailModal
                    game={games.find((game) => game.gameId == selectedGameId) || games[0]}
                    rankings={rankings}
                    pools={pools}
                    user={user}
                    closeDetailModal={closeDetailModal}
                    selectedGameId={selectedGameId}
                />
            )}
        </>
    );
}

const SwiperContainer = styled.div`
    width: 100%;
    height: 100%;
    --swiper-pagination-bottom: auto;
    --swiper-pagination-top: ${USER_AREA_HEIGht}px;
    --swiper-pagination-bullet-height: ${NAVIGATION_AREA_HEIGHT}px;
`;

const HeaderArea = styled.div`
    width: calc(100% - 32px);
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: ${USER_AREA_MARGIN}px;
    z-index: 2;
`;

const UserArea = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const UserNftImg = styled.img`
    width: ${USER_NFT_IMAGE_SIZE}px;
    height: ${USER_NFT_IMAGE_SIZE}px;
`;

const UserTotalAmount = styled.div`
    margin-left: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
`;

const LoginArea = styled.div`
    color: #fff;
`;
