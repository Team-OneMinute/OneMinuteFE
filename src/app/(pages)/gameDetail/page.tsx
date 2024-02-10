"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

export default function GameDetailPage() {
  const router = useRouter();
  return (
    <DefaultTemplate title="Game Detail Page">
      <button onClick={() => router.push('/play')}>Play</button>
    </DefaultTemplate>
  );
}
