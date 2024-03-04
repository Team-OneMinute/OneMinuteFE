"use client"
import styled from "styled-components";

// components
import GameCard from "../component/gameCard";

interface props {
    games: Game[];
}

const AllGamesSlide: React.FC<props> = ({ games }) => {
    const gameDetailPath = (id: string) =>{
        const defaltGameDetailPath = "/gameDetail";
        const delimiter = "?";
        const param = "id="
        return defaltGameDetailPath + delimiter + param + id;
      };
    
    return (
        <Background>
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
        </Background>
    );
  };
export default AllGamesSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background3.png);
    background-size:100% auto;
`;

const GameCardArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 6vw;
  margin-right: 6vw;
`;