"use client"
import React, { CSSProperties, useEffect, useState } from 'react';
import styled from "styled-components";
import { NAVIGATION_AREA_HEIGHT, USER_AREA_HEIGht, USER_AREA_MARGIN, USER_NFT_IMAGE_SIZE } from './styles';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';

// components
import { getTopWanted, getNewWanted, getHotWanted } from "./service/wanted";
import { getAllActiveGames } from "./service/game";

// slides
import HotPotSlide from './(slides)/GameWantedSlideSlide';
import LegendSlide from './(slides)/LegendSlide';
import AllGamesSlide from './(slides)/AllGameSlide';
import GameGenreSlide from './(slides)/GameGenreSlide';
import ShopSlide from './(slides)/UserSlide';
import { getGameRanking } from './service/ranking';

const pageName = ["ALL", "ACTION", "BATTLE", "SHOOTING", "PUZZLE"];

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return '<div class="' + className + '">' + pageName[index] + '</div>';
    },
  };

  useEffect(() => {
    (async () => {
      // Games List
      const gameList = await getAllActiveGames();
      setGames(gameList.sort((a, b) => a.topAmount - b.topAmount));
      if (games.length > 0) {
        setSelectedGameId(games[0].gameId);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      if (selectedGameId) {
        const ranking = await getGameRanking(selectedGameId);
        // TODO: ranking sort
      }
    })();
  }, [selectedGameId]);

  return (
    <SwiperContainer>
      <UserArea>
          <UserNftImg src='/static/images/temp/tmpUser.png' />
          <UserTotalAmount>$1000</UserTotalAmount>
      </UserArea>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <AllGamesSlide
            games={games}
            selectedGameId={selectedGameId}
            setSelectedGameId={setSelectedGameId}
          />
        </SwiperSlide>
        <SwiperSlide>
          <GameGenreSlide pageName = "Action Slide" />
        </SwiperSlide>
        <SwiperSlide>
          <GameGenreSlide pageName = "Battle Slide" />
        </SwiperSlide>
        <SwiperSlide>
          <GameGenreSlide pageName = "Shooting Slide" />
        </SwiperSlide>
        <SwiperSlide>
          <GameGenreSlide pageName = "Puzzle Slide" />
        </SwiperSlide>
      </Swiper>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
    width: 100%;
    height: 100%;
    --swiper-pagination-bottom: auto;
    --swiper-pagination-top: ${USER_AREA_HEIGht}px;
    --swiper-pagination-bullet-height: ${NAVIGATION_AREA_HEIGHT}px;
`;

const UserArea = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: ${USER_AREA_MARGIN}px;
    z-index: 2;
`;

const UserNftImg = styled.img`
    width: ${USER_NFT_IMAGE_SIZE}px;
    height: ${USER_NFT_IMAGE_SIZE}px;
`;

const UserTotalAmount = styled.div`
    margin-left: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
`;
