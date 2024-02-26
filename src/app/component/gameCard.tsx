"use client"
import React from 'react';
import styled from "styled-components";

interface props {
    url: string;
    title: string;
    navigateTo: string;
    earn: number;
}

const GameCard: React.FC<props> = ({ url, title, navigateTo, earn }) => {
  return (
    <CardContainer onClick={() => window.location.href = navigateTo}>
        <GameBackground src={url}/>
        <Thumbnail src={url}/>
        <GameInfo>
            <h2>{title}</h2>
            <Earn>3,500円</Earn>
            <button type="button">Ranking</button>
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
  width: 50px;
  height: 50px;
`;

const GameInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-align: right;
`;

const Earn = styled.p`
    color: #4CAF50;
`;

const GameTitle = styled.div`
    margin-bottom: 4px;
    font-weight: bold;
`;

export default GameCard;
