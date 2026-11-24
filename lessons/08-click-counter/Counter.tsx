import { useState } from "react";

// ตัวนับ: กด +1 / -1 และรีเซ็ตกลับไปค่าเริ่มต้น
export function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(initial)}>รีเซ็ต</button>
    </div>
  );
}
