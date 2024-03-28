'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

// services
import { decrementLife } from '@/app/service/user';
import { setTransaction } from '@/app/service/gameTransaction';
import { addScoreDocument, getMyGameScore } from '@/app/service/score';
import { betFee } from '@/app/service/bet';
import { playGame } from '@/app/service/game';

// components
// import { CountDownMovie } from "@/app/component/countdownMovie";

interface props {
    game: Game;
    rankings: Score[];
    pools: Pool[];
    user: User | null;
    closeDetailModal: () => void;
    selectedGameId: string | null;
    hasLifeNft: boolean;
    togglePurchaseModal: () => void;
}

const GameDetailModal: React.FC<props> = ({
    game,
    rankings,
    pools,
    user,
    closeDetailModal,
    selectedGameId,
    hasLifeNft,
    togglePurchaseModal,
}) => {
    //TODO: Top-ranking user can not update ranking. Should tell the user.

    const router = useRouter();
    if (!selectedGameId || pools.length == 0 || !user) {
        return;
    }

    const hasLife = user.life > 0;
    const onClickPlayButton = async () => {
        const response = await playGame(user.userId, game.gameId);
        console.log(response);
        await clickPlay();
        // if (response.responseCode == '0000') {
        //     await clickPlay();
        // } else {
        //     togglePurchaseModal();
        // }
    };

    const clickPlay = async () => {
        console.log(user.docNo);
        // fetch previous user score data
        const scoreData = await getMyGameScore(selectedGameId, user.userId);
        // set new User Score (0)
        let prevScore = 0;
        if (scoreData.length == 0) {
            await addScoreDocument(selectedGameId, user.userId, 0); // TODO: migration firebase function
            prevScore = 0;
        } else {
            prevScore = scoreData[0].score;
        }
        // bet fee
        // betFee();
        // decrement user life -1
        // await decrementLife(user.docNo);
        // add gameTransaction
        // await setTransaction(selectedGameId, user.userId);

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
