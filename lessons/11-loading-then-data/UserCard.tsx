import { useEffect, useState } from "react";

// โหลดข้อมูลผู้ใช้จากฟังก์ชันที่ส่งเข้ามา ระหว่างรอแสดง "กำลังโหลด..."
export function UserCard({ loadUser }: { loadUser: () => Promise<{ name: string }> }) {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    loadUser().then((user) => setName(user.name));
  }, [loadUser]);

  if (name === null) return <p>กำลังโหลด...</p>;
  return <p>{name}</p>;
}
