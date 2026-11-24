import { test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostList } from "./PostList";

// ================================================
// บทที่ 12: ปลอม fetch
// ฝึก: vi.spyOn, mockResolvedValue, toHaveBeenCalledWith, vi.restoreAllMocks
//
// test ไม่ควรยิง API จริง เราจึง "สลับ" fetch เป็นตัวปลอมที่คืนข้อมูลที่เรากำหนด
//
//   vi.spyOn(globalThis, "fetch").mockResolvedValue({
//     ok: true,
//     json: async () => [{ id: 1, title: "โพสต์แรก" }],
//   } as Response);
//
// หลังจบ test ต้องคืนของจริง ด้านล่างมี afterEach(() => vi.restoreAllMocks()) ให้แล้ว
//
// ตัวอย่าง:
//   (เหมือนโค้ดด้านบน แล้ว render(<PostList />) ตามด้วย await screen.findByText("โพสต์แรก"))
// ================================================

afterEach(() => {
  vi.restoreAllMocks();
});


// ------------------------------------------------
// ข้อ 1: fetch คืนโพสต์ "โพสต์แรก" ต้องเห็นชื่อโพสต์นั้นบนหน้า
// แนวทาง: ปลอม fetch ก่อน render แล้ว await screen.findByText(...)
// ------------------------------------------------
test.todo("ต้องแสดงชื่อโพสต์ที่ fetch คืนมา");
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: component ต้องเรียก fetch ไปที่ "/api/posts"
// แนวทาง: เก็บ spy ไว้ในตัวแปร แล้ว expect(spy).toHaveBeenCalledWith("/api/posts") (อย่าลืมรอให้โหลดเสร็จก่อน)
// ------------------------------------------------
test.todo("ต้องเรียก fetch ไปที่ /api/posts");
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: fetch คืน 2 โพสต์ ต้องมี 2 รายการ
// แนวทาง: await screen.findAllByRole("listitem") (findAll... = รอแล้วได้ array) แล้ว toHaveLength(2)
// ------------------------------------------------
test.todo("2 โพสต์ ต้องมี 2 รายการ");
// 👉 เขียน test ของข้อ 3 ตรงนี้
