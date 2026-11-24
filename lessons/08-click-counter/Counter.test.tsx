import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

// ================================================
// บทที่ 08: จำลองการกดปุ่ม
// ฝึก: userEvent.setup(), await user.click, toHaveTextContent
//
// ตั้งแต่บทนี้ test จะ "ลงมือใช้งาน" component เหมือนผู้ใช้จริง
//
//   const user = userEvent.setup();   สร้างผู้ใช้จำลอง 1 คน (ทำต้น test)
//   await user.click(ปุ่ม);           กดปุ่ม ต้องใส่ await เสมอ และ test ต้องเป็น async
//
// หลังกด React ใช้เวลาอัปเดตหน้าจอ แต่ userEvent รอให้เอง
// เราจึงตรวจผลได้ทันทีหลัง await
//
// ตัวอย่าง:
//   test("กด +1 แล้วเป็น 1", async () => {
//     const user = userEvent.setup();
//     render(<Counter />);
//     await user.click(screen.getByRole("button", { name: "+1" }));
//     expect(screen.getByText("Count: 1")).toBeInTheDocument();
//   });
// ================================================


// ------------------------------------------------
// ข้อ 1: เริ่มต้นต้องแสดง "Count: 0"
// แนวทาง: ยังไม่ต้องกดอะไร แค่ render แล้วตรวจ (ไม่ต้อง async ก็ได้)
// ------------------------------------------------
test("เริ่มต้นต้องแสดง Count: 0", () => {
  render(<Counter />);
  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 2: กด +1 สองครั้ง ต้องได้ "Count: 2"
// แนวทาง: await user.click(...) สองบรรทัด แล้วตรวจด้วย getByText หรือ toHaveTextContent
// ------------------------------------------------
test("กด +1 สองครั้งต้องได้ Count: 2", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole("button", { name: "+1" }));
  await user.click(screen.getByRole("button", { name: "+1" }));
  expect(screen.getByText("Count: 2")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: render <Counter initial={5} /> กด +1 แล้วกดรีเซ็ต ต้องกลับมาเป็น "Count: 5"
// แนวทาง: ปุ่มรีเซ็ตหาด้วย getByRole("button", { name: "รีเซ็ต" })
// ------------------------------------------------
test("กดรีเซ็ตต้องกลับไปค่า initial", async () => {
  const user = userEvent.setup();
  render(<Counter initial={5} />);
  await user.click(screen.getByRole("button", { name: "+1" }));
  await user.click(screen.getByRole("button", { name: "รีเซ็ต" }));
  expect(screen.getByText("Count: 5")).toBeInTheDocument();
});
