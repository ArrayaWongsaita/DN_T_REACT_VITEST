import { useState } from "react";

// ช่องพิมพ์งานใหม่ กด "เพิ่ม" เพื่อส่งข้อความขึ้นไปให้ตัวแม่ (ข้อความว่างจะไม่ถูกส่ง)
export function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setText("");
      }}
    >
      <label htmlFor="new-todo">งานใหม่</label>
      <input id="new-todo" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">เพิ่ม</button>
    </form>
  );
}
