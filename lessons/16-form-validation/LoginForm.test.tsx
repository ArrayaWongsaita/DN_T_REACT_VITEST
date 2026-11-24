import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

// ================================================
// บทที่ 16 (Advanced): ฟอร์มทั้งฟอร์ม
// ฝึก: รวมทุกอย่างที่เรียนมา: getByLabelText, user.type, user.click,
//       findByRole / getByRole("alert"), vi.fn, toHaveBeenCalledWith, not.toHaveBeenCalled
//
// ทดสอบแบบที่ผู้ใช้ทำจริง: พิมพ์ทีละช่อง กดปุ่ม แล้วดูว่าเห็นอะไร และ onSubmit ถูกเรียกไหม
//
// ตัวอย่าง (ส่วนที่ใช้ซ้ำได้):
//   const user = userEvent.setup();
//   const onSubmit = vi.fn();
//   render(<LoginForm onSubmit={onSubmit} />);
//   await user.type(screen.getByLabelText("อีเมล"), "mali@example.com");
//   await user.click(screen.getByRole("button", { name: "เข้าสู่ระบบ" }));
// ================================================


// ------------------------------------------------
// ข้อ 1: อีเมลผิดรูปแบบ (เช่น "abc") ต้องเห็น "กรุณากรอกอีเมลให้ถูกต้อง" และ onSubmit ต้องไม่ถูกเรียก
// แนวทาง: กรอกรหัสผ่านให้ถูก (8 ตัวขึ้นไป) เพื่อให้ error เหลือแค่อีเมล
// ------------------------------------------------
test.todo("อีเมลผิดรูปแบบ ต้องเห็น error และไม่เรียก onSubmit");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: รหัสผ่านสั้นไป (เช่น "123") ต้องเห็น "รหัสผ่านต้องยาวอย่างน้อย 8 ตัว" และ onSubmit ต้องไม่ถูกเรียก
// แนวทาง: กรอกอีเมลให้ถูกต้องก่อน แล้วตรวจ error ด้วย getByRole("alert")
// ------------------------------------------------
test.todo("รหัสผ่านสั้นไป ต้องเห็น error และไม่เรียก onSubmit");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: กรอกถูกทั้งสองช่อง onSubmit ต้องถูกเรียกพร้อม { email, password } และไม่มี alert
// แนวทาง: toHaveBeenCalledWith({ email: "...", password: "..." })
// ------------------------------------------------
test.todo("กรอกถูกต้อง ต้องเรียก onSubmit พร้อมค่าที่กรอก");
// 👉 เขียน test ของข้อ 3 ตรงนี้
