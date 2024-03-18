'use client';
import React from 'react';
import styled from 'styled-components';

interface props {
    gameImage: string;
    thumbnail: string;
    title: string;
    navigateTo: string;
    earn: number;
}

const GameCard: React.FC<props> = ({ gameImage, thumbnail, title, navigateTo, earn }) => {
    return (
        <CardContainer onClick={() => (window.location.href = navigateTo)}>
            <GameBackground src={gameImage} />
            <Thumbnail src={thumbnail} />
            <GameInfo>
                <h2>{title}</h2>
                <Earn>3,500円</Earn>
                <button type='button'>Ranking</button>
            </GameInfo>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    position: relative;
    width: 350px;
    height: 200px;
    margin: 5px;
`;

const GameBackground = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Thumbnail = styled.img`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 70px;
    height: 70px;
`;

const GameInfo = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-align: right;
`;

const Earn = styled.p`
    color: #4caf50;
`;

const GameTitle = styled.div`
    margin-bottom: 4px;
    font-weight: bold;
`;

export default GameCard;
