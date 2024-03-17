"use client"
import styled from "styled-components";

// components
import GameCard from "../component/gameCard";

interface props {
    games: Game[];
}

const GamesSlide: React.FC<props> = ({ games }) => {
    const gameDetailPath = (id: string) =>{
        const defaultGameDetailPath = "/gameDetail";
        const delimiter = "?";
        const param = "id="
        return defaultGameDetailPath + delimiter + param + id;
      };
    
    return (
        <Background>
            <NavigateButton>Recommend</NavigateButton>
            <NavigateButton>User</NavigateButton>
            <GameCardArea>
                {games.map((game) => (
                    <div key={game.gameId}>
                        <GameCard
                            gameImage={game.gameImageUrl}
                            thumbnail={game.gameThumbnailUrl}
                            title={game.gameTitle}
                            navigateTo={gameDetailPath(game.gameId)}
                            earn={game.topAmount}
                        />
                    </div>
                ))}
            </GameCardArea>
        </Background>
    );
  };
export default GamesSlide;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background1.png);
    background-size: cover;
`;

const NavigateButton = styled.button`
    width: 90px;
    height: 35px;
    margin: 40px;
    border: 2px solid #FFF;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
    color: #fff;
    background: transparent;
`;

const GameCardArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 6vw;
  margin-right: 6vw;
`;