"use client"
import { useRouter } from "next/navigation";
import styled from "styled-components";

const HeaderArea = styled.div`
  height: 48px;
  font-weight: bold;
`;

const BodyArea = styled.div`
  height: 100px;
`;

const FooterArea = styled.div`
  height: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FooterButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/static/images/background/background1.png);
    background-size:100% auto;
`;

const getFooterArea = (movePage: (uri: string) => void) => {
  return (
    <FooterArea>
      <FooterButton>
        <button onClick={() => movePage('/')}>HOT</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/')}>LEGEND</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/allGames')}>ALL GAMES</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/')}>SHOP</button>
      </FooterButton>
    </FooterArea>
  );
}

interface Props {
  title: string;
  children: React.ReactNode;
}

export const DefaultTemplate: React.FC<Props> = ({ title, children }) => {
  const router = useRouter();

  const movePage = (uri: string) => router.push(uri);

  return (
    <Background>
      <HeaderArea>
        {title}
      </HeaderArea>
      <BodyArea>
        {children}
      </BodyArea>
      {getFooterArea(movePage)}
    </Background>
  );
}