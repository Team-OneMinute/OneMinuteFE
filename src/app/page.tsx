"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  // HACK: main tag を突貫工事
  return (
    <main className={styles.main}>
      <DefaultTemplate title="Top Page">
        <button onClick={() => router.push('/gameDetail')}>GameDetail</button>
      </DefaultTemplate>
    </main>
  );
}
