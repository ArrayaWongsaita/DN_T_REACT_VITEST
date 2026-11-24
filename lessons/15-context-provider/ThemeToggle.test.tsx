import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "./test-utils";
import { ThemeToggle } from "./ThemeToggle";

// ================================================
// บทที่ 15 (Advanced): component ที่ต้องอยู่ใน Provider
// ฝึก: custom render ที่มี wrapper
//
// ThemeToggle ใช้ useTheme() ซึ่งต้องมี ThemeProvider ครอบอยู่ ถ้า render ตรงๆ จะไม่ได้ค่าจริง
// ในงานจริงมี Provider เยอะ (theme, auth, router...) จึงนิยมเขียนฟังก์ชัน render ของตัวเองไว้ใช้ซ้ำ
//
// ดู test-utils.tsx ในโฟลเดอร์นี้: renderWithTheme(ui, initial) ทำหน้าที่ครอบ ThemeProvider ให้
// (render ปกติของ RTL รับตัวเลือก wrapper ไว้สำหรับเรื่องนี้โดยเฉพาะ)
//
// ตัวอย่าง:
//   renderWithTheme(<ThemeToggle />);
//   expect(screen.getByRole("button")).toBeInTheDocument();
// ================================================


// ------------------------------------------------
// ข้อ 1: render ด้วย renderWithTheme ธีมเริ่มต้นต้องเป็น light (ปุ่มเขียนว่า "ธีม: light")
// แนวทาง: getByRole("button", { name: "ธีม: light" })
// ------------------------------------------------
test("ธีมเริ่มต้นต้องเป็น light", () => {
  renderWithTheme(<ThemeToggle />);
  expect(screen.getByRole("button", { name: "ธีม: light" })).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 2: กดปุ่ม ปุ่มต้องเปลี่ยนเป็น "ธีม: dark" และกดอีกครั้งกลับเป็น "ธีม: light"
// แนวทาง: await user.click(...) สองครั้ง ตรวจหลังแต่ละครั้ง
// ------------------------------------------------
test("กดปุ่มแล้วธีมสลับไปมา", async () => {
  const user = userEvent.setup();
  renderWithTheme(<ThemeToggle />);
  await user.click(screen.getByRole("button"));
  expect(screen.getByRole("button", { name: "ธีม: dark" })).toBeInTheDocument();
  await user.click(screen.getByRole("button"));
  expect(screen.getByRole("button", { name: "ธีม: light" })).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: renderWithTheme(<ThemeToggle />, "dark") ต้องเริ่มที่ "ธีม: dark"
// แนวทาง: ส่ง argument ตัวที่สองเข้าไป
// ------------------------------------------------
test("เริ่มต้นเป็น dark ได้", () => {
  renderWithTheme(<ThemeToggle />, "dark");
  expect(screen.getByRole("button", { name: "ธีม: dark" })).toBeInTheDocument();
});
