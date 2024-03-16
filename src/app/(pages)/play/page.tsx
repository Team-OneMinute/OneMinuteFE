"use client"
import GameCanvas from "@/app/(gameComponents)/(Canvas)/GameCanvas";
import GameCanvas2 from "@/app/(gameComponents)/(Canvas)/GameCanvas2";
import { upsertRanking } from "@/app/service/ranking";
import { useRouter, useSearchParams } from "next/navigation";

export default function GamePlayingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const updateRanking = (score: number) => {
    upsertRanking(id, score);
  }
  switch (id) {
    case "0001":
      return <GameCanvas />
    case "0002":
      return <GameCanvas2 backAction={() => router.push("/")} updateRanking={updateRanking} />
    case "0003":
      return <GameCanvas />
    default: // TODO: クライアントで設定していないgameId、またはURLにgameIdがない場合の処理
      return <GameCanvas />
  }
}
