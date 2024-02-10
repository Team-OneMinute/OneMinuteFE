"use client"
import { useRouter } from "next/navigation";
import { DefaultTemplate } from "@/app/(templates)/DefaultTemplate";

export default function UserPage() {
  const router = useRouter();
  return (
    <DefaultTemplate title="User Page">
      <button onClick={() => router.push('/')}>Top</button>
    </DefaultTemplate>
  );
}
