"use client";

import { useRouter } from "next/navigation";

// ปุ่มบันทึก แล้วพาไปหน้า /done
export function SaveAndGo() {
  const router = useRouter();
  return <button onClick={() => router.push("/done")}>บันทึก</button>;
}
