"use client"
import { useRouter } from "next/navigation";
import styled from "styled-components";

const HeaderArea = styled.div`
  height: 48px;
  font-weight: bold;
`;

const BodyArea = styled.div`
  padding: 1em;
  height: 100px;
`;

const TopNavigationArea = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const ActiveNavigationButton = styled.button`
  display: block;
  text-decoration: none;
  width: 12px;
  text-align: center;
  padding: 1rem 2.5rem 1rem 2.5rem;
  font-weight: bold;
  border: 2px solid #27acd9;
  color: #27acd9;
  border-radius: 100vh;
  transition: 0.5s;
`;

const UnActiveNavigationButton = styled.button`
  background-color: #4CAF50;
  border: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

// const getFooterArea = (movePage: (uri: string) => void) => {
//   return (
//     <FooterArea>
//       <FooterButton>
//         <button onClick={() => movePage('/')}>HOT</button>
//       </FooterButton>
//       <FooterButton>
//         <button onClick={() => movePage('/')}>LEGEND</button>
//       </FooterButton>
//       <FooterButton>
//         <button onClick={() => movePage('/allGames')}>ALL GAMES</button>
//       </FooterButton>
//       <FooterButton>
//         <button onClick={() => movePage('/')}>SHOP</button>
//       </FooterButton>
//     </FooterArea>
//   );
// }

const getTopNavigationArea = (movePage: (uri: string) => void) => {
  return (
    <TopNavigationArea>
      <ActiveNavigationButton onClick={() => movePage('/')}>HotWanted</ActiveNavigationButton>
      <ActiveNavigationButton onClick={() => movePage('/')}>Legends</ActiveNavigationButton>
      <ActiveNavigationButton onClick={() => movePage('/allGames')}>AllGames</ActiveNavigationButton>
      <ActiveNavigationButton onClick={() => movePage('/')}>Shop</ActiveNavigationButton>
    </TopNavigationArea>
  );
}


const getFooterArea = (movePage: (uri: string) => void) => {
  return (
    <FooterArea>
      <FooterButton>
        <ActiveNavigationButton onClick={() => movePage('/')}>USER</ActiveNavigationButton>
      </FooterButton>
      <FooterButton>
        <ActiveNavigationButton onClick={() => movePage('/')}>RECOMMEND</ActiveNavigationButton>
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
      </HeaderArea>
      {getTopNavigationArea(movePage)}
      <BodyArea>
        {children}
      </BodyArea>
      {getFooterArea(movePage)}
    </Background>
  );
}