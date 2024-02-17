"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

// component
import GameCard from "./component/gameCard";

import { firebaseConfig } from './firebaseConfig';

import { initializeApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from "react";


export default function Home() {
  const router = useRouter();

  type Game = {
    id: string;
    title: string;
    imageUrl: string;
    maxPod: number;
  };
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    (async () => {
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const gameList = await getGameList(db);
      const sortedGames = await gameList.sort((a, b) => a.maxPod - b.maxPod);
      setGames(sortedGames);
    })();
  }, []);

  // Get game data from firebase
  const getGameList = async (db: Firestore) => {
    const gamesCollection = collection(db, 'games');
    const gameDocs = await getDocs(gamesCollection);
    const gamesData = gameDocs.docs.map(doc => doc.data());

    const gameList = gamesData.map(data => {
      return {
        id: String(data.id),
        title: String(data.title),
        imageUrl: String(data.image_url),
        maxPod: Number(data.max_pot),
      } as Game;
    });
    console.log(gameList);
    return gameList;
  };

  return (
    <>
      <DefaultTemplate title="Top Page">
      <div>
        {games.map((game) => (
          <div key={game.id}>
            <GameCard
              url={game.imageUrl}
              title={game.title}
              navigateTo="/destination-url"
              earn={game.maxPod}
            />
          </div>
        ))}
      </div>
      <button onClick={() => router.push('/gameDetail')}>GameDetail</button>
      </DefaultTemplate>
    </>
  );
}
