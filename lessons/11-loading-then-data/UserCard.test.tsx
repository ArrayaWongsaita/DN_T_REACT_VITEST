import { test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { UserCard } from "./UserCard";

// ================================================
// บทที่ 11: ของที่มาทีหลัง (async)
// ฝึก: findBy..., waitFor
//
// บางอย่างไม่ขึ้นทันที เช่น รอข้อมูลโหลด
//
//   await screen.findByText("Mali")   รอจนกว่าจะเจอ (สูงสุดประมาณ 1 วินาที) ถ้าไม่เจอ test ล้ม
//   await waitFor(() => { expect(...) })   ลองตรวจซ้ำๆ จนผ่านหรือหมดเวลา
//
// หลักจำ: ของที่ "มีอยู่แล้ว" ใช้ getBy   ของที่ "จะมา" ใช้ findBy   ของที่ "ต้องไม่มี" ใช้ queryBy
//
// ฟังก์ชันปลอมที่คืน Promise: vi.fn().mockResolvedValue({ name: "Mali" })
//
// ตัวอย่าง:
//   const loadUser = vi.fn().mockResolvedValue({ name: "Mali" });
//   render(<UserCard loadUser={loadUser} />);
//   expect(await screen.findByText("Mali")).toBeInTheDocument();
// ================================================


// ------------------------------------------------
// ข้อ 1: ทันทีที่ render ต้องเห็น "กำลังโหลด..."
// แนวทาง: ตอนนี้ข้อมูลยังไม่มา ใช้ getByText ได้เลย (ไม่ต้อง await)
// ------------------------------------------------
test.todo("ตอนแรกต้องเห็น กำลังโหลด...");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: สักพักต้องเห็นชื่อ "Mali"
// แนวทาง: test ต้องเป็น async แล้ว await screen.findByText("Mali")
// ------------------------------------------------
test.todo("โหลดเสร็จต้องเห็นชื่อ Mali");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: โหลดเสร็จแล้ว "กำลังโหลด..." ต้องหายไป
// แนวทาง: await waitFor(() => expect(screen.queryByText("กำลังโหลด...")).not.toBeInTheDocument())
// ------------------------------------------------
test.todo("โหลดเสร็จแล้วข้อความกำลังโหลดต้องหายไป");
// 👉 เขียน test ของข้อ 3 ตรงนี้
