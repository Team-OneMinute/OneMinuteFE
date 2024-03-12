"use client"
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

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
import AllGamesSlide from './(slides)/GamesSlide1';
import ShopSlide from './(slides)/UserSlide';

const pageName = ["ALL GAME", "Legend", "User"];

export default function App() {
  const [games, setGames] = useState<Game[]>([]);

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
    })();
  }, []);

  return (
    <SwiperContainer>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <HotPotSlide games = {games}/>
        </SwiperSlide>
        <SwiperSlide>
          <LegendSlide pageName = "Legend slide"></LegendSlide>
        </SwiperSlide>
        <SwiperSlide>
          <ShopSlide pageName = "user slide"></ShopSlide>
        </SwiperSlide>
      </Swiper>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
    width: 100%;
    height: 100%; 
`;