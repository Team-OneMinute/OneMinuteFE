"use client"
import React from 'react';
import WantedPoster from "../component/wantedPoster";

import styled from "styled-components";

interface props {
    topWanted: Wanted[];
    newWanted: Wanted[];
    hotWanted: Wanted[];
}

const HotPotSlide: React.FC<props> = ({ topWanted, newWanted, hotWanted }) => {
    return (
        <Background>
            <BigPotArea>BIG POT</BigPotArea>
            <WantedPosterArea>
                {topWanted.map((wanted) => (
                <div key={wanted.gameId}>
                    <WantedPoster userImage={wanted.userImageUrl} frameNo="1"/>
                </div>
                ))}
            </WantedPosterArea>
            <HotArea>Hot Wanted</HotArea>
            <WantedPosterArea>
                {newWanted.map((wanted) => (
                <div key={wanted.gameId}>
                    <WantedPoster userImage={wanted.userImageUrl} frameNo="1"/>
                </div>
                ))}
            </WantedPosterArea>
            <NewArea>New Wanted</NewArea>
            <WantedPosterArea>
                {hotWanted.map((wanted) => (
                <div key={wanted.gameId}>
                    <WantedPoster userImage={wanted.userImageUrl} frameNo="1"/>
                </div>
                ))}
            </WantedPosterArea>
        </Background>
    );
  };
export default HotPotSlide;

const BigPotArea = styled.div`
  font-size: 6vw;
  font-weight:bold;
  color: #FFFFFF;
`;

const HotArea = styled.div`
  font-size: 6vw;
  font-weight:bold;
  color: #FFFFFF;
`;

const NewArea = styled.div`
  font-size: 6vw;
  font-weight:bold;
  color: #FFFFFF;
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
    background-image: url(/static/images/background/background1.png);
    background-size:100% auto;
`;