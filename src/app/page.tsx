"use client"
import React, { useEffect, useState } from 'react';

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
import HotPotSlide from './(slides)/HotPotSlide';
import LegendSlide from './(slides)/LegendSlide';
import AllGamesSlide from './(slides)/AllGamesSlide';
import ShopSlide from './(slides)/ShopSlide';

const pageName = ["HOT", "LEGEND", "ALL", "SHOP"];

export default function App() {
  const [topWanted, setTopWanted] = useState<Wanted[]>([]);
  const [newWanted, setNewWanted] = useState<Wanted[]>([]);
  const [hotWanted, setHotWanted] = useState<Wanted[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return '<span class="' + className + '">' + pageName[index] + '</span>';
    },
  };

  useEffect(() => {
    (async () => {
      // HACK:非同期で取ったほうがいいかも
      // Potが大きいWanted取得 limit number 
      const topWanted = await getTopWanted(9);
      const newWanted = await getNewWanted(2);
      const hotWanted = await getHotWanted(5);
      setTopWanted(topWanted);
      setNewWanted(newWanted);
      setHotWanted(hotWanted);

      // Games List
      const gameList = await getAllActiveGames();
      // HACK: sortは、Fetchのタイミングでsortかけたほうが早い場合はリファクタ
      const sortedGames = await gameList.sort((a, b) => a.maxPod - b.maxPod);
      setGames(sortedGames);
    })();
  }, []);

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <HotPotSlide 
            topWanted = {topWanted}
            newWanted = {newWanted}
            hotWanted = {hotWanted}/>
        </SwiperSlide>
        <SwiperSlide>
          <LegendSlide pageName = "Legend slide"></LegendSlide>
        </SwiperSlide>
        <SwiperSlide>
          <AllGamesSlide games = {games}></AllGamesSlide>
        </SwiperSlide>
        <SwiperSlide>
          <ShopSlide pageName = "shop slide"></ShopSlide>        
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
