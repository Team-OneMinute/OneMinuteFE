"use client"
import { useRouter } from "next/navigation";

export default function GamePlayingPage() {
  const router = useRouter();
  return (
    <>
      <div>ゲーム画面</div>
      <button onClick={() => router.push('/gameDetail')}>戻る</button>
    </>
  );
}
