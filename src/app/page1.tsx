"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

import { getTopWanted, getNewWanted, getHotWanted } from "./service/wanted";
import { useEffect, useState } from "react";

// component
import WantedPoster from "./component/wantedPoster"

import styled from "styled-components";

export default function Home() {
  // TODO: loading

  const router = useRouter();
  const [topWanted, setTopWanted] = useState<Wanted[]>([]);
  const [newWanted, setNewWanted] = useState<Wanted[]>([]);
  const [hotWanted, setHotWanted] = useState<Wanted[]>([]);

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
    })();
  }, []);

  return (
      <DefaultTemplate title="Top Page">
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
          {hotWanted.map((wanted) => (
              <div key={wanted.gameId}>
                <WantedPoster userImage={wanted.userImageUrl} frameNo="1"/>
              </div>
            ))}
        </WantedPosterArea>
        <NewArea>New Wanted</NewArea>
        <WantedPosterArea>
          {newWanted.map((wanted) => (
            <div key={wanted.gameId}>
              <WantedPoster userImage={wanted.userImageUrl} frameNo="1"/>
            </div>
          ))}
        </WantedPosterArea>
      </DefaultTemplate>
  );
}

const WantedPosterArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 6vw;
  margin-right: 6vw;
`;

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
