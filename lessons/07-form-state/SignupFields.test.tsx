import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignupFields } from "./SignupFields";

// ================================================
// บทที่ 07: ตรวจสถานะของฟอร์ม
// ฝึก: getByLabelText, toHaveValue, toBeChecked, toBeDisabled, toBeEnabled
//
// getByLabelText("อีเมล")  หา input จากข้อความของ label ที่ผูกกับมัน
// toHaveValue("a@b.com")   ค่าที่อยู่ในช่อง input
// toBeChecked()            checkbox ถูกติ๊กอยู่
// toBeDisabled()           ปุ่ม/ช่องถูกปิดไว้ กดไม่ได้   (ตรงข้ามคือ toBeEnabled())
//
// ตัวอย่าง:
//   render(<SignupFields agreed={false} email="" />);
//   expect(screen.getByRole("button", { name: "สมัคร" })).toBeDisabled();
// ================================================


// ------------------------------------------------
// ข้อ 1: ส่ง email="mali@example.com" ช่องอีเมลต้องมีค่านั้น
// แนวทาง: getByLabelText("อีเมล") แล้ว toHaveValue(...)
// ------------------------------------------------
test.todo("ช่องอีเมลต้องแสดงค่าที่ส่งเข้าไป");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: agreed={true} checkbox ต้องถูกติ๊ก ส่วน agreed={false} ต้องไม่ถูกติ๊ก
// แนวทาง: getByRole("checkbox", { name: "ยอมรับเงื่อนไข" }) แล้ว toBeChecked() / .not.toBeChecked()
// ------------------------------------------------
test.todo("checkbox ต้องสะท้อนค่า agreed");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: ปุ่มสมัครต้อง disabled เมื่อยังไม่ยอมรับ และ enabled เมื่อยอมรับแล้ว
// แนวทาง: แยกเป็นสอง test (agreed={false} หนึ่งอัน และ agreed={true} อีกอัน)
//          ใช้ getByRole("button", { name: "สมัคร" }) แล้ว toBeDisabled() / toBeEnabled()
// ------------------------------------------------
test.todo("ปุ่มสมัคร disabled เมื่อ agreed เป็น false");
// 👉 เขียน test ของข้อ 3 ตรงนี้

test.todo("ปุ่มสมัคร enabled เมื่อ agreed เป็น true");
// 👉 เขียน test ของข้อ 3 (ต่อ) ตรงนี้
