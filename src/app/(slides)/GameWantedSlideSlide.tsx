"use client"
import React, { useEffect, useState } from 'react';

// component
import WantedPoster from "../component/wantedPoster";
import WantedCard from "../component/WantedCard";

import styled from "styled-components";

interface props {
    games: Game[];
}

const GameWantedSlide: React.FC<props> = ({ games }) => {

    return (
        <Background>
            <Game>
                <center>
                    {games.map((game, i) => (
                    <div key={i}>
                        <WantedCard
                        gameImgUrl={game.gameImageUrl}
                        wantedUrl='static/images/temp/WantedSample.jpg'
                        gameTitle={game.gameTitle}/>
                    </div>
                    ))}
                </center>
            </Game>
        </Background>
    );
  };
export default GameWantedSlide;

const Game = styled.div`
    top: 160px;
    width: 100%;
    height: 80%;
    position: absolute;
    overflow: scroll;
`;

const WantedPosterArea = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: 6vw;
    margin-right: 6vw;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background_black.png);
    background-size: cover;
`;
