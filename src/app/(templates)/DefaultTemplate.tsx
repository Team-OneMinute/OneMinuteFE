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
  height: 48px;
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

const getFooterArea = (movePage: (uri: string) => void) => {
  return (
    <FooterArea>
      <FooterButton>
        <button onClick={() => movePage('/')}>top</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/')}>ranking</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/user')}>user</button>
      </FooterButton>
      <FooterButton>
        <button onClick={() => movePage('/')}>market</button>
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
    <>
      <HeaderArea>
        {title}
      </HeaderArea>
      <BodyArea>
        {children}
      </BodyArea>
      {getFooterArea(movePage)}
    </>
  );
}