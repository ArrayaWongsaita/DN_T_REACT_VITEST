import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FruitList } from "./FruitList";

// ================================================
// บทที่ 06: ตรวจรายการหลายตัว
// ฝึก: getAllByRole, toHaveLength
//
// getAllByRole("listitem")  คืน array ของ element ทุกตัว (li = listitem) ถ้าไม่เจอเลยจะ error
// expect(array).toHaveLength(3)  array ต้องมี 3 ตัว
// items[0]                  เข้าถึงตัวแรกของ array แล้วตรวจต่อได้
//
// ตัวอย่าง:
//   render(<FruitList items={["ส้ม"]} />);
//   expect(screen.getAllByRole("listitem")).toHaveLength(1);
// ================================================


// ------------------------------------------------
// ข้อ 1: ส่ง 3 ผลไม้ ต้องมี 3 รายการ
// แนวทาง: getAllByRole("listitem") แล้ว toHaveLength(3)
// ------------------------------------------------
test("ส่ง 3 ผลไม้ ต้องมี 3 รายการ", () => {
  render(<FruitList items={["ส้ม", "กล้วย", "องุ่น"]} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});


// ------------------------------------------------
// ข้อ 2: รายการแรกต้องเป็นผลไม้ตัวแรกที่ส่งเข้าไป
// แนวทาง: เก็บผลลัพธ์ getAllByRole ไว้ในตัวแปร แล้ว expect(ตัวแปร[0]).toHaveTextContent(...)
// ------------------------------------------------
test("รายการแรกต้องเป็นผลไม้ตัวแรก", () => {
  render(<FruitList items={["ส้ม", "กล้วย", "องุ่น"]} />);
  const rows = screen.getAllByRole("listitem");
  expect(rows[0]).toHaveTextContent("ส้ม");
});


// ------------------------------------------------
// ข้อ 3: ส่ง array ว่าง ต้องเห็นข้อความ "ไม่มีรายการ" และไม่มี list
// แนวทาง: getByText สำหรับข้อความ และ queryByRole("list") + .not.toBeInTheDocument() สำหรับ list
// ------------------------------------------------
test("array ว่างต้องแสดงข้อความ ไม่มีรายการ", () => {
  render(<FruitList items={[]} />);
  expect(screen.getByText("ไม่มีรายการ")).toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});
