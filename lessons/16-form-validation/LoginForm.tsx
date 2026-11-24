import { useState } from "react";

type Credentials = { email: string; password: string };

// ฟอร์มเข้าสู่ระบบ ตรวจอีเมลและรหัสผ่านก่อนส่ง ถ้าไม่ผ่านจะแสดงข้อความ error และไม่เรียก onSubmit
export function LoginForm({ onSubmit }: { onSubmit: (values: Credentials) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const found: string[] = [];
        if (!/^\S+@\S+\.\S+$/.test(email)) found.push("กรุณากรอกอีเมลให้ถูกต้อง");
        if (password.length < 8) found.push("รหัสผ่านต้องยาวอย่างน้อย 8 ตัว");
        setErrors(found);
        if (found.length === 0) onSubmit({ email, password });
      }}
    >
      <label htmlFor="email">อีเมล</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">รหัสผ่าน</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.map((message) => (
        <p role="alert" key={message}>
          {message}
        </p>
      ))}

      <button type="submit">เข้าสู่ระบบ</button>
    </form>
  );
}
