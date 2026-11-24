import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Greeting } from "./Greeting";

// ================================================
// บทที่ 02: ค้นหาด้วย role และส่ง props
// ฝึก: getByRole, ตัวเลือก { name }, การส่ง props ให้ component
//
// getByRole("heading")                  หา element ตามหน้าที่ (h1-h6 = heading, button = button)
// getByRole("button", { name: "..." })  หาปุ่มที่ข้อความบนปุ่มตรงกับ name
//
// ทำไมใช้ role? เพราะมันตรงกับที่ผู้ใช้จริงและโปรแกรมอ่านหน้าจอเห็น
// เป็น query ที่ Testing Library แนะนำให้ลองใช้เป็นอันดับแรก
//
// ตัวอย่าง:
//   render(<Greeting name="Mali" />);
//   expect(screen.getByRole("heading")).toBeInTheDocument();
// ================================================


// ------------------------------------------------
// ข้อ 1: Greeting name="Mali" ต้องมี heading ที่เขียนว่า "สวัสดี Mali"
// แนวทาง: getByRole("heading", { name: "สวัสดี Mali" })
// ------------------------------------------------
test.todo("heading ต้องแสดงชื่อ Mali");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: ต้องมีปุ่มชื่อ "ทักทาย"
// แนวทาง: getByRole("button", { name: "ทักทาย" })
// ------------------------------------------------
test.todo("ต้องมีปุ่มทักทาย");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: เปลี่ยน props เป็น name="Somchai" heading ต้องเปลี่ยนตาม
// แนวทาง: render อีกชื่อหนึ่งใน test นี้ (props ต่างกัน = ผลต่างกัน)
// ------------------------------------------------
test.todo("เปลี่ยนชื่อเป็น Somchai แล้ว heading เปลี่ยนตาม");
// 👉 เขียน test ของข้อ 3 ตรงนี้
