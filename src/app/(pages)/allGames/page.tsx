"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

// firebase
import { useEffect, useState } from "react";
import { getAllActiveGames } from "../../service/game"

// component
import GameCard from "../../component/gameCard";
import styled from "styled-components";

export default function UserPage() {
  const router = useRouter();

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    (async () => {
      const gameList = await getAllActiveGames();
      // HACK: sortは、Fetchのタイミングでsortかけたほうが早い場合はリファクタ
      const sortedGames = await gameList.sort((a, b) => a.maxPod - b.maxPod);
      setGames(sortedGames);
    })();
  }, []);

  const gameDetailPath = (id: string) =>{
    const defaltGameDetailPath = "/gameDetail";
    const delimiter = "?";
    const param = "id="
    return defaltGameDetailPath + delimiter + param + id;
  };

  return (
      <DefaultTemplate title="All Games">
        <GameCardArea>
          {games.map((game) => (
            <div key={game.id}>
              <GameCard
                url={game.imageUrl}
                title={game.title}
                navigateTo={gameDetailPath(game.id)}
                earn={game.maxPod}
              />
            </div>
          ))}
        </GameCardArea>
      </DefaultTemplate>
  );
}


const GameCardArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 6vw;
  margin-right: 6vw;
`;