'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { NAVIGATION_AREA_HEIGHT, USER_AREA_HEIGht, USER_AREA_MARGIN, USER_NFT_IMAGE_SIZE } from './styles';
import { DNA } from 'react-loader-spinner';

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

// components
import GameDetailModal from './component/GameDetailModal';
import NftPurchaseModal from './component/NftPurchaseModal';
import { ButtonBase } from '@/app/component/Atoms/Button';

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
    const [isOpenPurchaseModal, setIsOpenPurchaseModal] = useState<boolean>(false);
    const [credential, setCredential] = useState<UserCredential | null>(null);
    const [initialized, setInitialized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: any) {
            return `<div class="${className}"> ${pageName[index]} </div>`;
        },
    };

    const closeDetailModal = useCallback(() => {
        setIsOpenDetailModal(false);
    }, []);

    const togglePurchaseModal = useCallback(() => {
        setIsOpenPurchaseModal(!isOpenPurchaseModal);
    }, []);

    const topPageInitialized = async (): Promise<void> => {
        authInitialize();

        const gameList = await getAllActiveGames();
        const sortedGameList = await gameList.sort((a, b) => a.topAmount - b.topAmount);
        setGames(sortedGameList);
        if (sortedGameList.length > 0) {
            console.log('aaaa');
            setSelectedGameId(sortedGameList[0].gameId);
        }

        setInitialized(true);
    };

    const afterInitialized = async () => {
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

                console.log("start user data fetch");
                const userData = await getUser(tmpCredential.uid);
                console.log('user');
                console.log(userData);
                await setUser(userData);
            }

            // TODO: other game fetch and add store
            setLoading(false);
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

    const totalGetReward = () => {
        if (user == null) {
            return;
        }

        const totalReward = user?.claimableReward + user?.totalClaimed;
        return totalReward > 0 ? totalReward : 0;
    };

    const selectCharacterClick = () => {
        router.push('/selectCharacter');
    }

    const loginUserHeaderArea = () => {
        console.log(user?.purchasedNftFlg);
        return (
            // TODO: blockchain接続後、src入れかえ
            <>
                <UserArea onClick={() => router.push('/user')}>
                    <UserNftImg src='/static/images/temp/tmpUser.png' />
                    <UserTotalAmount>{`${totalGetReward()}`}</UserTotalAmount>
                </UserArea>
                {user?.characterNftFlg == false && (
                    <SelectCharacterButtonArea>
                        <ButtonBase text='Select Character' onClick={selectCharacterClick} />
                    </SelectCharacterButtonArea>
                )}
            </>
        );
    };

    const logoutUserHeaderArea = () => {
        return (
            // TODO:無課金ユーザ用画像用意
            <>
                <UserArea onClick={() => router.push('/user')}>
                    <UserNftImg src='/static/images/temp/tmpUser.png' />
                </UserArea>
                <LoginArea onClick={() => router.push('/login')}>ログイン</LoginArea>
            </>
        );
    };

    return (
        <>
            <DNA
                visible={loading}
                height='70%'
                width='50%'
                ariaLabel='dna-loading'
                wrapperStyle={{}}
                wrapperClass='dna-wrapper'
            />
            {loading == false && (
                <>
                    <SwiperContainer>
                        <HeaderArea>
                            {credential == null && logoutUserHeaderArea()}
                            {credential != null && loginUserHeaderArea()}
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
                            pools={pools}
                            user={user}
                            closeDetailModal={closeDetailModal}
                            selectedGameId={selectedGameId}
                            togglePurchaseModal={togglePurchaseModal}
                        />
                    )}
                    {isOpenPurchaseModal && (
                        <>
                            <NftPurchaseModal closeModal={() => togglePurchaseModal()} />
                        </>
                    )}
                </>
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

const SelectCharacterButtonArea = styled.div`

`;

const LoginArea = styled.div`
    color: #fff;
`;
