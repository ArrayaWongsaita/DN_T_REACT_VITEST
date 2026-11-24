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
test("fetch พัง ต้องเห็นข้อความโหลดไม่สำเร็จ", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));
  render(<SafePostList />);
  expect(await screen.findByRole("alert")).toHaveTextContent("โหลดไม่สำเร็จ");
});


// ------------------------------------------------
// ข้อ 2: fetch ได้ array ว่าง ต้องเห็น "ยังไม่มีโพสต์"
// แนวทาง: json: async () => [] แล้ว await screen.findByText("ยังไม่มีโพสต์")
// ------------------------------------------------
test("array ว่างต้องเห็นข้อความ ยังไม่มีโพสต์", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => [],
  } as Response);
  render(<SafePostList />);
  expect(await screen.findByText("ยังไม่มีโพสต์")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: กรณีปกติยังต้องทำงาน คือเห็นชื่อโพสต์ และต้องไม่มี alert
// แนวทาง: await findByText(...) ก่อน แล้วค่อย expect(screen.queryByRole("alert")).not.toBeInTheDocument()
// ------------------------------------------------
test("กรณีปกติต้องเห็นโพสต์และไม่มี alert", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => [{ id: 1, title: "โพสต์แรก" }],
  } as Response);
  render(<SafePostList />);
  await screen.findByText("โพสต์แรก");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
