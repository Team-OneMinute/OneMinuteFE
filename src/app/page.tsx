"use client"
import React, { useCallback, useEffect, useState } from 'react';
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
import { getPools } from "./service/pool";

// slides
import HotPotSlide from './(slides)/GameWantedSlideSlide';
import LegendSlide from './(slides)/LegendSlide';
import AllGamesSlide from './(slides)/AllGameSlide';
import GameGenreSlide from './(slides)/GameGenreSlide';
import ShopSlide from './(slides)/UserSlide';
import { getGameScore } from './service/score';
import GameDetailModal from './component/GameDetailModal';

const pageName = ["ALL", "ACTION", "BATTLE", "SHOOTING", "PUZZLE"];

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [rankings, setRankings] = useState<Score[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return `<div class="${className}"> ${pageName[index]} </div>`;
    },
  };

  const closeDetailModal = useCallback(() => {
    setIsOpenDetailModal(false);
  }, []);

  useEffect(() => {
    (async () => {
      // fetch from database
      const gameList = await getAllActiveGames();
      const sortedGameList = await gameList.sort((a, b) => a.topAmount - b.topAmount)
      await setGames(sortedGameList);
      if (games.length > 0) {
        setSelectedGameId(games[0].gameId);
      };

    })();
  }, []);

  useEffect(() => {
      if (games.length > 0) {
        setSelectedGameId(games[0].gameId);
      };
  }, [games]);

  useEffect(() => {
    (async () => {
      // TODO: second fetch, add data in STORE
      if (selectedGameId) {
        const poolList = await getPools(selectedGameId);
        const rankingList = await getGameScore(selectedGameId);
        setRankings(rankingList.sort((a, b) => a.score - b.score));

        setPools(poolList); // already sorted by top amount
      }
    })();
  }, [selectedGameId]);

  return (
    <>
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
              rankings={rankings}
              pools={pools}
              selectedGameId={selectedGameId}
              setSelectedGameId={setSelectedGameId}
              setIsOpenDetailModal={setIsOpenDetailModal}
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
      {isOpenDetailModal &&
        <GameDetailModal
          game={games.find(game => game.gameId == selectedGameId) || games[0]}
          rankings={rankings}
          pools={pools}
          closeDetailModal={closeDetailModal}
          selectedGameId={selectedGameId}
        />
      }
    </>
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
