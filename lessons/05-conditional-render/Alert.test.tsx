import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

// ================================================
// บทที่ 05: ตรวจว่า "ไม่มี" อะไรบนหน้า
// ฝึก: queryByRole, .not.toBeInTheDocument
//
// getBy...    ถ้าไม่เจอ จะ throw error ทันที ใช้เมื่อ "ต้องมี"
// queryBy...  ถ้าไม่เจอ จะคืน null ไม่ error ใช้เมื่อตรวจว่า "ต้องไม่มี"
//
// ตัวอย่าง:
//   render(<Alert message="x" visible={false} />);
//   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
// ================================================


// ------------------------------------------------
// ข้อ 1: visible={true} ต้องเห็นกล่องแจ้งเตือน
// แนวทาง: getByRole("alert") แล้ว toBeInTheDocument()
// ------------------------------------------------
test("visible เป็น true ต้องเห็น alert", () => {
  render(<Alert message="บันทึกแล้ว" visible={true} />);
  expect(screen.getByRole("alert")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 2: visible={false} ต้องไม่เห็นกล่องแจ้งเตือน
// แนวทาง: ลองใช้ getByRole ดูก่อนว่าเกิดอะไรขึ้น แล้วเปลี่ยนเป็น queryByRole + .not
// ------------------------------------------------
test("visible เป็น false ต้องไม่เห็น alert", () => {
  render(<Alert message="บันทึกแล้ว" visible={false} />);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: alert ต้องแสดงข้อความที่ส่งเข้าไป
// แนวทาง: toHaveTextContent("...") กับ element ที่ได้จาก getByRole("alert")
// ------------------------------------------------
test("alert ต้องแสดงข้อความที่ส่งเข้าไป", () => {
  render(<Alert message="บันทึกแล้ว" visible={true} />);
  expect(screen.getByRole("alert")).toHaveTextContent("บันทึกแล้ว");
});
