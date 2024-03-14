"use client"
import { useRouter, useSearchParams } from "next/navigation";

export default function GameDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  var gameId = searchParams.get("id") ?? "";

  return (
    <div>
      <button onClick={() => router.push(`/play?id=${gameId}`)}>Play</button>
    </div>
  );
}
