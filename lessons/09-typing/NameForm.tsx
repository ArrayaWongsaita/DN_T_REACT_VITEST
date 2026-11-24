import { useState } from "react";

// ช่องกรอกชื่อ แล้วทักทายตามที่พิมพ์ ถ้าว่างจะทักทาย "คนแปลกหน้า"
export function NameForm() {
  const [name, setName] = useState("");
  return (
    <div>
      <label htmlFor="name">ชื่อ</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <p>สวัสดี {name || "คนแปลกหน้า"}</p>
    </div>
  );
}
