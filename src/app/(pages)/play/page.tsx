"use client"
import GameCanvas from "@/app/(gameComponents)/(Canvas)/GameCanvas";
import GameCanvas2 from "@/app/(gameComponents)/(Canvas)/GameCanvas2";
import { upsertRanking } from "@/app/service/ranking";
import { useRouter, useSearchParams } from "next/navigation";

// service
import { getUser } from '../../service/user';
import { getMyScoreDocNo, updateScoreDocByDocNo } from "@/app/service/score";

export default function GamePlayingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const prevScoreStr = params.get("score") ?? "";
  const prevScore = Number(prevScoreStr); // TODO: ストアやキャッシュから取得する
  const updateScore = async (newScore: number) => {
    const scoreDocNo = getMyScoreDocNo(id, )
    await updateScoreDocByDocNo(id, scoreDocNo);
  }
  const updateRanking = async (score: number) => {
    // TODO:認証ができるまでは一旦決め打ち。最終的にはstrage.uidからクレデンシャル引く
    const userId = "0001A";
    const user = await getUser(userId);
    upsertRanking(id, score, user);
  }
  const finalize = async (newScore: number) => {
    if (prevScore < newScore) {
      updateRanking(newScore);
    }
  }
  switch (id) {
    case "0001":
      return <GameCanvas />
    case "0002":
      return <GameCanvas2 backAction={() => router.push("/")} finalize={finalize} />
    case "0003":
      return <GameCanvas />
    default: // TODO: クライアントで設定していないgameId、またはURLにgameIdがない場合の処理
      return <GameCanvas />
  }
}
