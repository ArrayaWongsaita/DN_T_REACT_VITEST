import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";

// ================================================
// บทที่ 01: test component แรก
// ฝึก: render, screen.getByText, toBeInTheDocument
//
// render(<Component />)  วาด component ลงใน "หน้าเว็บจำลอง" (jsdom)
// screen                 ตัวช่วยค้นหาสิ่งที่อยู่บนหน้าเว็บจำลองนั้น
// getByText("...")       หา element ที่มีข้อความนี้ ถ้าไม่เจอ test จะ error ทันที
// toBeInTheDocument()    ตรวจว่า element นั้นอยู่บนหน้าจริง
//
// ตัวอย่าง:
//   render(<Hello />);
//   expect(screen.getByText("Hello, React!")).toBeInTheDocument();
//   (ข้อ 1 ในบทนี้เหมือนตัวอย่างนี้ ให้ลองพิมพ์เองโดยไม่ copy)
// ================================================


// ------------------------------------------------
// ข้อ 1: Hello ต้องแสดงข้อความ "Hello, React!"
// แนวทาง: render(<Hello />) แล้ว expect(screen.getByText(...)).toBeInTheDocument()
// ------------------------------------------------
test("Hello ต้องแสดงข้อความ Hello, React!", () => {
  render(<Hello />);
  expect(screen.getByText("Hello, React!")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 2: ค้นหาด้วย regex ไม่สนตัวพิมพ์เล็กใหญ่
// แนวทาง: getByText รับ regular expression ได้ เช่น /hello/i (i = ไม่สนตัวพิมพ์เล็กใหญ่)
// ------------------------------------------------
test("หาข้อความ hello ได้ด้วย regex /hello/i", () => {
  render(<Hello />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: ข้อความนั้นต้องอยู่ใน tag h1
// แนวทาง: getByText คืน element กลับมา ใช้ .tagName ดูชื่อ tag (ได้ตัวพิมพ์ใหญ่ เช่น "H1") แล้ว toBe(...)
// ------------------------------------------------
test("ข้อความ Hello, React! ต้องอยู่ใน tag h1", () => {
  render(<Hello />);
  expect(screen.getByText("Hello, React!").tagName).toBe("H1");
});
