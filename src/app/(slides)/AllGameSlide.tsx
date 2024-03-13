"use client"
import React, { useEffect } from 'react';
import styled from "styled-components";
import { NAVIGATION_AREA_HEIGHT, USER_AREA_HEIGht } from '../styles';

interface position {
    x: number;
    y: number;
}

interface props {
    games: Game[];
    selectedGameId: string | null;
    setSelectedGameId: (gameId: string) => void;
}

const AllGameSlide: React.FC<props> = ({ games, selectedGameId, setSelectedGameId }) => {
    console.log("selectedGameId: " + selectedGameId);
    const positionSet = [
        {x: 20, y: 20},
        {x: 80, y: 80},
        {x: 20, y: 80},
        {x: 80, y: 20},
    ];

    const isActive = (gameId: string) => {
        return gameId == selectedGameId;
    };

    const onClickNftAction = (gameId: string) => {
        if (!isActive(gameId)) {
            setSelectedGameId(gameId);
        }
    };

    const getGameTargetDiv = (games: Game[]) => {
        // TODO:
        if (games.length > 0) {
            return games.map((game, index) => {
                return (
                    <GameTarget isActive={isActive(game.gameId)} position={positionSet[index]} onClick={() => onClickNftAction(game.gameId)}>
                        <GameThumbnailImage src="/static/images/temp/game_thumnail_1.png" />
                        <SymbolNftImage src="/static/images/temp/User1.png" />
                    </GameTarget>
                );
            });
        }
    };

    return (
        <Background>
            <GameFieldArea>
                <GameFieldImage />
                {getGameTargetDiv(games)}
            </GameFieldArea>
            <DetailArea>
                <div></div>
            </DetailArea>
        </Background>
    );
  };
export default AllGameSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;

const GameFieldArea = styled.div`
    position: relative;
    top: ${USER_AREA_HEIGht + NAVIGATION_AREA_HEIGHT}px;
    height: 278px;
    margin: 16px 4px;
`;
const GameFieldImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/island/allLand.png);
    background-size: cover;
`;
const GameTarget = styled.div<{isActive: boolean, position: position}>`
    position: absolute;
    width: ${props => props.isActive ? 50 : 30}px;
    height: ${props => props.isActive ? 50 : 30}px;
    left: ${props => props.position.x}px;
    top: ${props => props.position.y}px;
    ${props => props.isActive ? "border: 3px solid #ff0000" : ""};
`;
const GameThumbnailImage = styled.img`
    width: 100%;
    height: 50%;
`
const SymbolNftImage = styled.img`
    width: 100%;
    height: 50%;
`;

const DetailArea = styled.div`
`;

const MaxRewardDiv = styled.div`
`;

const RankingRangeDiv = styled.div`
`;

const RecentlyUpdateCountDiv = styled.div`
`;

const RankingSummaryDiv = styled.div`
`;