import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

// ================================================
// บทที่ 04: ตรวจ attribute และ class
// ฝึก: toHaveAttribute, toHaveClass, .not
//
// expect(el).toHaveAttribute("href", "/home")  attribute href ต้องเท่ากับ "/home"
// expect(el).toHaveClass("badge-danger")       ต้องมี class นี้ (ไม่ต้องตรงทุก class)
// expect(el).not.toHaveClass("badge-info")     ต้อง "ไม่มี" class นี้
//
// ตัวอย่าง:
//   render(<Badge label="ใหม่" href="/new" />);
//   expect(screen.getByRole("link", { name: "ใหม่" })).toHaveAttribute("href", "/new");
//   (tag a ที่มี href มี role เป็น "link")
// ================================================


// ------------------------------------------------
// ข้อ 1: Badge ที่ส่ง href="/docs" ต้องเป็นลิงก์ที่ชี้ไป /docs
// แนวทาง: getByRole("link", { name: "..." }) แล้ว toHaveAttribute("href", "/docs")
// ------------------------------------------------
test.todo("ส่ง href แล้วต้องเป็นลิงก์ที่ชี้ไป /docs");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: ไม่ส่ง variant ต้องมี class "badge-info"
// แนวทาง: หา element ด้วย getByText("...") แล้ว toHaveClass("badge-info")
// ------------------------------------------------
test.todo("ไม่ส่ง variant ต้องมี class badge-info");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: variant="danger" ต้องมี "badge-danger" และต้องไม่มี "badge-info"
// แนวทาง: ใช้ toHaveClass คู่กับ .not.toHaveClass
// ------------------------------------------------
test.todo("variant danger ต้องมี badge-danger และไม่มี badge-info");
// 👉 เขียน test ของข้อ 3 ตรงนี้
