"use client";

import { useRouter } from "next/navigation";

// ปุ่มย้อนกลับ
export function BackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()}>ย้อนกลับ</button>;
}
