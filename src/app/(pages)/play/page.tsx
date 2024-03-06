"use client"
import GameCanvas from "@/app/(gameComponents)/GameCanvas";
import { useSearchParams } from "next/navigation";

export default function GamePlayingPage() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  switch (id) {
    case "0001":
      return <GameCanvas />
    case "0002":
      return <GameCanvas />
    case "0003":
      return <GameCanvas />
    default: // TODO: クライアントで設定していないgameId、またはURLにgameIdがない場合の処理
      return <GameCanvas />
  }
}
