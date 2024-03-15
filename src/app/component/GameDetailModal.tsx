"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface props {
    games: Game[];
    rankings: Score[];
    pools: Pool[];
    closeDetailModal: () => void;
    selectedGameId: string | null;
}

const GameDetailModal: React.FC<props> = ({ games, rankings, pools, closeDetailModal, selectedGameId }) => {
  const router = useRouter();
  if (selectedGameId === null || pools.length === 0) {
    return;
  }
  console.log(games);
  return (
    <DetailModalArea>
      <Overlay onClick={(e) => e.target === e.currentTarget && closeDetailModal()}>
        <Content>
          <SubTitle>Game About</SubTitle>
          <GameDetail>{games[0].gameDetail}</GameDetail>
          <SubTitle>Reward</SubTitle>
          <RewardDetail>{pools[0].potAmount}</RewardDetail>
          <PlayButtonArea>
            <PlayButton onClick={() => router.push(`/play?id=${selectedGameId}`)}>Free Play</PlayButton>
            <PlayButton onClick={() => router.push(`/play?id=${selectedGameId}`)}>Play</PlayButton>  
          </PlayButtonArea>
        </Content>
      </Overlay>
    </DetailModalArea>
  );
};

const DetailModalArea = styled.div`
  width: 100%;
  height: 100px;
`;

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

const PlayButtonArea = styled.div`
  position: fixed;
  bottom: 10%;
  display: flex;
`;

export default GameDetailModal;
