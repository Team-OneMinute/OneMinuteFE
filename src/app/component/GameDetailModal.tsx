"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import styled from "styled-components";

// services
import { decrementLife } from "../service/user";
import { setTransaction } from "../service/gameTransaction";

// components
// import { CountDownMovie } from "../component/countdownMovie";

interface props {
    game: Game;
    rankings: Score[];
    pools: Pool[];
    user: User | null;
    closeDetailModal: () => void;
    selectedGameId: string | null;
}

const GameDetailModal: React.FC<props> = ({ game, rankings, pools, user, closeDetailModal, selectedGameId }) => {
  const router = useRouter();
  if (!selectedGameId || pools.length == 0 || !user) {
    return;
  }

  const clickPlay = async () => {
    console.log(user.docNo);
    // decrement user life -1
    await decrementLife(user.docNo);
    // add gameTransaction
    await setTransaction(selectedGameId, user.userId);
    router.push(`/play?id=${selectedGameId}`);
  }

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && closeDetailModal()}>
      <Content>
        <SubTitle>Game About</SubTitle>
        <GameDetail>{game.gameDetail}</GameDetail>
        <SubTitle>Reward</SubTitle>
        <RewardDetail>{pools[0].potAmount}</RewardDetail>
        <SubTitle>Life</SubTitle>
        <UserLife>❤️✖︎{user.life} → ❤️✖︎{user.life - 1}</UserLife>
        <PlayButtonArea>
          <PlayButton onClick={() => router.push(`/play?id=${selectedGameId}`)}>Free Play</PlayButton>
          <PlayButton onClick={() => clickPlay()}>Play</PlayButton>
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
    height: 50vh;
    text-align: center;
    position: fixed;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80vmin;
    z-index: 11;
`;

const UserLife = styled.div`
  
`;

const PlayButtonArea = styled.div`
  position: fixed;
  bottom: 10%;
  display: flex;
`;

export default GameDetailModal;
