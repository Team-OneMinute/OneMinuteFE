"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// firebase
import { firebaseConfig } from "../../infrastructure/firebase/firebaseConfig";
import { initializeApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export default function GameDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  var gameId = searchParams.get("id") ?? "";

  const [ranking, setRanking] = useState<Ranking[]>([]);

  useEffect(() => {
    (async () => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const rankings = await getRankings(db, gameId);
      const sortedRanking = rankings.sort((a, b) => a.score - b.score);
      setRanking(sortedRanking);
    })();
  }, []);

  const getRankings = async (db: Firestore, gameId: string) => {
    const prefix = "_ranking";
    const rankingsCollection = collection(db, gameId + prefix);
    const rankingDocs = await getDocs(rankingsCollection);

    // HACK: sortは、Fetchのタイミングでsortかけたほうが早い場合はリファクタ
    const rankingData = rankingDocs.docs.map(doc => doc.data());

    const ranking = rankingData.map(data => {
      return {
        isRoot: Boolean(data.is_root),
        nextId: String(data.next_id),
        score: Number(data.score),
        userId: String(data.user_id),
      } as Ranking;
    });
    console.log(ranking);
    return ranking;
  };

  return (
    <div>
      <button onClick={() => router.push('/play')}>Play</button>
    </div>
  );
}
