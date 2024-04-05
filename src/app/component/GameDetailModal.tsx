'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

// services
import { getMyGameScore } from '@/app/service/score';
import { playGame } from '@/app/service/game';

// components
import { ButtonBase } from '@/app/component/Atoms/Button';

interface props {
    game: Game;
    pools: Pool[];
    user: User | null;
    closeDetailModal: () => void;
    selectedGameId: string | null;
    togglePurchaseModal: () => void;
}

const GameDetailModal: React.FC<props> = ({
    game,
    pools,
    user,
    closeDetailModal,
    selectedGameId,
    togglePurchaseModal,
}) => {
    //TODO: Top-ranking user can not update ranking. Should tell the user.

    const router = useRouter();
    if (!selectedGameId || pools.length == 0 || !user) {
        return;
    }

    const onClickFreePlayHandler = () => {
        router.push(`/play?id=${selectedGameId}`);
    };

    const onClickMainPlayHandler = async () => {
        // this route is main play
        // FIXME: change secure code. Now API requires wallet address, 
        // but when use other address, could not search bought own nft.
        const walletAddress = "0xABC1234";
        const response = await playGame(user.userId, game.gameId, walletAddress);
        console.log(response);
        if (response == '0000') {
            await playInitialize();
        } else if (response == '0001') {
            togglePurchaseModal();
        } else {
            console.log('buy portion');
        }
    };

    const userLife = () => {
        if (user.life > 0) {
            <>
                <LifeImage src='/static/images/temp/hart.png' />
                ✖︎{user.life} →
                <LifeImage src='/static/images/temp/hart.png' />
                ✖︎{user.life - 1}
            </>;
        }
        return (
            <>
                <LifeImage src='/static/images/temp/hart.png' />
                ✖︎{user.life}
            </>
        );
    };

    const playInitialize = async () => {
        // fetch previous user score data
        const scoreData = await getMyGameScore(selectedGameId, user.userId);
        // set new User Score (0)
        let prevScore = 0;
        if (scoreData.length == 0) {
            prevScore = 0;
        } else {
            prevScore = scoreData[0].score;
        }
        // move play page
        router.push(`/play?id=${selectedGameId}&score=${prevScore}`);
    };

    return (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeDetailModal()}>
            <Content>
                <GameInfoArea>
                    <SubTitle>Game About</SubTitle>
                    <GameDetail>{game.gameDetail}</GameDetail>
                </GameInfoArea>
                <RewardArea>
                    <SubTitle>Reward</SubTitle>
                    <RewardDetail>${pools[0].potAmount}</RewardDetail>
                </RewardArea>
                <LifeArea>
                    <SubTitle>Life</SubTitle>
                    <UserLife>{userLife()}</UserLife>
                </LifeArea>
                <PlayButtonArea>
                    <FreePlayButtonArea>
                        <ButtonBase text='FreePlay' onClick={onClickFreePlayHandler} />
                    </FreePlayButtonArea>
                    <MainPlayButtonArea>
                        <ButtonBase text='RankingBattle' onClick={onClickMainPlayHandler} />
                    </MainPlayButtonArea>
                </PlayButtonArea>
            </Content>
        </Overlay>
    );
};

const SubTitle = styled.div`
    color: #fff;
    text-align: left;
    font-weight: bold;
    margin: 5px;
`;

const GameInfoArea = styled.div`
    width: 100%;
    height: 25%;
`;
const RewardArea = styled.div`
    width: 100%;
    height: 25%;
`;
const LifeArea = styled.div`
    width: 100%;
    height: 25%;
`;

const PlayButtonArea = styled.div`
    display: flex;
    height: 25%;
    margin: auto;
`;

const GameDetail = styled.div`
    color: #fff;
    text-align: left;
`;

const RewardDetail = styled.div`
    color: #fff;
`;

const FreePlayButtonArea = styled.div`
    height: 50%;
    width: 50%;
    margin-right: 5%;
`;
const MainPlayButtonArea = styled.div`
    height: 50%;
    width: 50%;
    margin-left: 5%;
`;

const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: -100vh;
    left: -100vw;
    bottom: -100vh;
    right: -100vw;
    z-index: 1;
`;

const Content = styled.div`
    background-color: black;
    box-sizing: border-box;
    border-radius: 8vmin;
    text-align: center;
    position: fixed;
    height: 50%;
    width: 80%;
    top: 25%;
    left: 10%;
    display: flex;
    flex-direction: column;
    z-index: 11;
`;

const UserLife = styled.div`
    color: #fff;
    height: 100%;
`;

const LifeImage = styled.img`
    height: 50%;
`;

export default GameDetailModal;
