import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceTag } from "./PriceTag";

// ================================================
// บทที่ 03: ตรวจข้อความใน element
// ฝึก: toHaveTextContent
//
// expect(element).toHaveTextContent("abc")  ข้อความใน element "มีคำว่า abc อยู่"
// expect(element).toHaveTextContent(/\d+/)  ใช้ regex ก็ได้
//
// ต่างจาก getByText ยังไง?
//   getByText ใช้ "หา" element จากข้อความ
//   toHaveTextContent ใช้ "ตรวจ" ข้อความของ element ที่หาเจอแล้ว (หาด้วย role ก่อนก็ได้)
//
// ตัวอย่าง:
//   render(<PriceTag price={100} />);
//   expect(screen.getByRole("paragraph")).toHaveTextContent("100");
// ================================================


// ------------------------------------------------
// ข้อ 1: ไม่ส่ง currency ต้องได้ "250 THB"
// แนวทาง: render(<PriceTag price={250} />) แล้วตรวจ element ด้วย toHaveTextContent("250 THB")
// ------------------------------------------------
test("ไม่ส่ง currency ต้องแสดง 250 THB", () => {
  render(<PriceTag price={250} />);
  expect(screen.getByRole("paragraph")).toHaveTextContent("250 THB");
});


// ------------------------------------------------
// ข้อ 2: ส่ง currency="USD" ต้องได้ "9 USD"
// แนวทาง: ส่ง props เพิ่ม currency="USD"
// ------------------------------------------------
test("ส่ง currency USD ต้องแสดง 9 USD", () => {
  render(<PriceTag price={9} currency="USD" />);
  expect(screen.getByRole("paragraph")).toHaveTextContent("9 USD");
});


// ------------------------------------------------
// ข้อ 3: ข้อความต้องมีตัวเลขอยู่ด้วย
// แนวทาง: toHaveTextContent(/\d+/)
// ------------------------------------------------
test("ข้อความต้องมีตัวเลข", () => {
  render(<PriceTag price={100} />);
  expect(screen.getByRole("paragraph")).toHaveTextContent(/\d+/);
});
