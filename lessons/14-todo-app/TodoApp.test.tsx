import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";

// ================================================
// บทที่ 14 (Advanced): หลาย component ทำงานร่วมกัน
// ฝึก: ทดสอบ component แม่ที่ประกอบด้วย TodoInput + TodoList + TodoItem
//
// ตั้งแต่บทนี้เราเทสที่ "TodoApp" ตัวเดียว แต่มันพา component ลูกมาทำงานด้วย
// เราไม่ต้องเทสลูกแยกทีละตัว และไม่ต้อง mock ลูก
// เพราะผู้ใช้จริงก็เห็นทั้งหมดเป็นหน้าเดียวกัน
//
// ใช้ของที่เรียนมาทั้งหมดรวมกัน: getByLabelText, user.type, user.click,
// getByRole("checkbox", { name }), toBeChecked, getByText
//
// ตัวอย่าง (ช่วยแค่การเพิ่มงาน):
//   await user.type(screen.getByLabelText("งานใหม่"), "ซื้อนม");
//   await user.click(screen.getByRole("button", { name: "เพิ่ม" }));
// ================================================


// ------------------------------------------------
// ข้อ 1: พิมพ์ "ซื้อนม" แล้วกด "เพิ่ม" ต้องเห็นงานนี้ในรายการ
// แนวทาง: หลังเพิ่ม มี checkbox ชื่อ "ซื้อนม" โผล่ขึ้นมา
// ------------------------------------------------
test("เพิ่มงานแล้วต้องเห็นงานในรายการ", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  await user.type(screen.getByLabelText("งานใหม่"), "ซื้อนม");
  await user.click(screen.getByRole("button", { name: "เพิ่ม" }));
  expect(screen.getByRole("checkbox", { name: "ซื้อนม" })).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 2: เพิ่ม 2 งาน ติ๊กงานแรก ต้องเห็นว่าถูกติ๊ก และข้อความเปลี่ยนเป็น "เหลือ 1 รายการ"
// แนวทาง: toBeChecked() กับ checkbox งานแรก และ getByText("เหลือ 1 รายการ")
// ------------------------------------------------
test("ติ๊กงานแล้วจำนวนที่เหลือต้องลดลง", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  await user.type(screen.getByLabelText("งานใหม่"), "ซื้อนม");
  await user.click(screen.getByRole("button", { name: "เพิ่ม" }));
  await user.type(screen.getByLabelText("งานใหม่"), "ล้างจาน");
  await user.click(screen.getByRole("button", { name: "เพิ่ม" }));
  expect(screen.getByText("เหลือ 2 รายการ")).toBeInTheDocument();

  await user.click(screen.getByRole("checkbox", { name: "ซื้อนม" }));
  expect(screen.getByRole("checkbox", { name: "ซื้อนม" })).toBeChecked();
  expect(screen.getByText("เหลือ 1 รายการ")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: กด "เพิ่ม" ตอนช่องว่าง ต้องไม่มีงานเพิ่มขึ้น (ยังเป็น "เหลือ 0 รายการ")
// แนวทาง: queryAllByRole("listitem") ต้อง toHaveLength(0)
// ------------------------------------------------
test("ช่องว่างต้องเพิ่มงานไม่ได้", async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  await user.click(screen.getByRole("button", { name: "เพิ่ม" }));
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  expect(screen.getByText("เหลือ 0 รายการ")).toBeInTheDocument();
});
