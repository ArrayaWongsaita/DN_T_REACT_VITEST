import { test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SafePostList } from "./SafePostList";

// ================================================
// บทที่ 13: ทดสอบเส้นทางที่ไม่ปกติ
// ฝึก: mockRejectedValue, findByRole, สถานะ error และ empty
//
// test ที่ดีไม่ได้ดูแค่กรณีสำเร็จ ต้องดูกรณีพังและกรณีไม่มีข้อมูลด้วย
//
//   vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"))  ทำให้ fetch พัง
//   vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: true, json: async () => [] } as Response)  ได้ array ว่าง
//
// ตัวอย่าง:
//   vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));
//   render(<SafePostList />);
//   expect(await screen.findByRole("alert")).toBeInTheDocument();
// ================================================

afterEach(() => {
  vi.restoreAllMocks();
});


// ------------------------------------------------
// ข้อ 1: fetch พัง ต้องเห็น alert ข้อความ "โหลดไม่สำเร็จ"
// แนวทาง: mockRejectedValue แล้ว await screen.findByRole("alert") ตามด้วย toHaveTextContent
// ------------------------------------------------
test.todo("fetch พัง ต้องเห็นข้อความโหลดไม่สำเร็จ");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: fetch ได้ array ว่าง ต้องเห็น "ยังไม่มีโพสต์"
// แนวทาง: json: async () => [] แล้ว await screen.findByText("ยังไม่มีโพสต์")
// ------------------------------------------------
test.todo("array ว่างต้องเห็นข้อความ ยังไม่มีโพสต์");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: กรณีปกติยังต้องทำงาน คือเห็นชื่อโพสต์ และต้องไม่มี alert
// แนวทาง: await findByText(...) ก่อน แล้วค่อย expect(screen.queryByRole("alert")).not.toBeInTheDocument()
// ------------------------------------------------
test.todo("กรณีปกติต้องเห็นโพสต์และไม่มี alert");
// 👉 เขียน test ของข้อ 3 ตรงนี้
