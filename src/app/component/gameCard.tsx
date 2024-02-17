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
      <Thumbnail src={url} alt={title}/>
      <TextContainer>
        <Title>{title}</Title>
        <Earn>{earn.toLocaleString()} $</Earn>
      </TextContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.1s;
    width: fit-content;
    padding: 16px;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    margin: auto;
`;

const Thumbnail = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
`;

const TextContainer = styled.div`
    font-size: 16px;
    color: #000;
`;

const Title = styled.div`
    margin-bottom: 4px;
    font-weight: bold;
`;

const Earn = styled.div`
    color: #4CAF50;
`;

export default GameCard;
