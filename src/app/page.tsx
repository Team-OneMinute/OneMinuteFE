"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

export default function Home() {
  const router = useRouter();
  return (
    <DefaultTemplate title="Top Page">
      <button onClick={() => router.push('/gameDetail')}>GameDetail</button>
    </DefaultTemplate>
  );
}
