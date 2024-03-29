'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

// services
import { getMyGameScore } from '@/app/service/score';
import { playGame } from '@/app/service/game';

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

    const onClickPlayButton = async () => {
        const response = await playGame(user.userId, game.gameId);
        console.log(response);
        if (response == '0000') {
            await clickPlay();
        } else if (response == '0001') {
            togglePurchaseModal();
        } else {
            console.log("buy portion");
        }
    };

    const clickPlay = async () => {
        console.log(user.docNo);
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
                <SubTitle>Game About</SubTitle>
                <GameDetail>{game.gameDetail}</GameDetail>
                <SubTitle>Reward</SubTitle>
                <RewardDetail>{pools[0].potAmount}</RewardDetail>
                <SubTitle>Life</SubTitle>
                <UserLife>
                    ❤️✖︎{user.life} → ❤️✖︎{user.life - 1}
                </UserLife>
                <PlayButtonArea>
                    <PlayButton onClick={() => router.push(`/play?id=${selectedGameId}`)}>Free Play</PlayButton>
                    <PlayButton onClick={() => onClickPlayButton()}>Play</PlayButton>
                </PlayButtonArea>
            </Content>
        </Overlay>
    );
};

const SubTitle = styled.div`
  color: #000,
  text-align: left;
  font-weight: bold;
  margin: 5px;
`;

const GameDetail = styled.div`
  color: #000,
  text-align: left;
`;

const RewardDetail = styled.div`
  color: #000,
  text-align: left;
`;

const PlayButton = styled.div`
    color: #000;
    border-radius: 8vmin;
    background: #aacaee;
    text-align: center;
    align-items: center;
    width: 150px;
    height: 30px;
    margin: 5%;
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
    background-color: white;
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

const UserLife = styled.div``;

const PlayButtonArea = styled.div`
    display: flex;
    margin-bottom: 10%;
    margin-top: auto;
`;

export default GameDetailModal;
