"use client"
import GameCanvas from "@/app/(gameComponents)/GameCanvas";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const CanvasArea = styled.div`
  border: solid 1px #000;
`;

export default function GamePlayingPage() {
  const router = useRouter();
  return (
    <>
      <div>ゲーム画面</div>
      <button onClick={() => router.push('/gameDetail')}>戻る</button>
      <CanvasArea>
        <GameCanvas />
      </CanvasArea>
    </>
  );
}
