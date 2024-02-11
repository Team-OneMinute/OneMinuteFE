"use client"
import { useRouter } from "next/navigation";
import { MainTemplate } from "./(templates)/MainTemplate";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

export default function Home() {
  const router = useRouter();
  return (
    <MainTemplate>
      <DefaultTemplate title="Top Page">
        <button onClick={() => router.push('/gameDetail')}>GameDetail</button>
      </DefaultTemplate>
    </MainTemplate>
  );
}
