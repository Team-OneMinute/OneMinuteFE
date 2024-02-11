"use client"
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
`;

interface Props {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<Props> = ({ children }) => {
  return (
    <Main>
      {children}
    </Main>
  );
}
