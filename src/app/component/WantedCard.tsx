'use client';
import React from 'react';
import styled from 'styled-components';

interface props {
    gameImgUrl: string;
    wantedUrl: string;
    gameTitle: string;
}

const WantedCard: React.FC<props> = ({ gameImgUrl, wantedUrl, gameTitle }) => {
    return (
        <CardContainer>
            <GameBackground src={gameImgUrl} />
            <UserThumbnail src={wantedUrl}></UserThumbnail>
            <GameInfo>
                <h2>{gameTitle}</h2>
            </GameInfo>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    position: relative;
    width: 350px;
    height: 200px;
    margin: 10px;
`;

const GameBackground = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
`;

const UserThumbnail = styled.img`
    position: absolute;
    top: 10px;
    left: 10px;
`;

const GameInfo = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    text-align: right;
`;

export default WantedCard;
