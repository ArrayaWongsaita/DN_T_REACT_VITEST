import { test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackButton } from "./BackButton";
import { SaveAndGo } from "./SaveAndGo";

// ================================================
// บทที่ 17 (Advanced): ปลอม next/navigation
// ฝึก: vi.mock, vi.hoisted, vi.clearAllMocks
//
// useRouter ของ Next.js ใช้ได้เฉพาะใน Next จริง ตอนเทสด้วย Vitest ไม่มี router ให้
// เราจึง "สลับ" โมดูล next/navigation ทั้งตัวให้เป็นของปลอมที่เราควบคุมได้
//
// vi.mock(...) ถูกยกขึ้นไปทำก่อนบรรทัด import ทั้งหมดเสมอ (hoist)
// ตัวแปรที่ใช้ใน vi.mock จึงต้องสร้างด้วย vi.hoisted ไม่งั้นจะเจอ "ยังไม่ถูกสร้าง"
//
// ด้านล่างเตรียม mock ให้แล้ว ใช้ push และ back ตรวจได้เลย
// หมายเหตุ: Server Component (async component) ใช้วิธีนี้ทดสอบไม่ได้ ในบทเรียนนี้เราเทสเฉพาะ Client Component
//
// ตัวอย่าง:
//   await user.click(screen.getByRole("button", { name: "ย้อนกลับ" }));
//   expect(back).toHaveBeenCalledTimes(1);
// ================================================

const { push, back } = vi.hoisted(() => ({ push: vi.fn(), back: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, back }),
}));


// ------------------------------------------------
// ข้อ 1: กด "ย้อนกลับ" router.back ต้องถูกเรียก 1 ครั้ง
// แนวทาง: render(<BackButton />) กดปุ่ม แล้ว expect(back).toHaveBeenCalledTimes(1)
// ------------------------------------------------
test("กดย้อนกลับต้องเรียก router.back 1 ครั้ง", async () => {
  const user = userEvent.setup();
  render(<BackButton />);
  await user.click(screen.getByRole("button", { name: "ย้อนกลับ" }));
  expect(back).toHaveBeenCalledTimes(1);
});


// ------------------------------------------------
// ข้อ 2: กด "บันทึก" router.push ต้องถูกเรียกด้วย "/done"
// แนวทาง: render(<SaveAndGo />) กดปุ่ม แล้ว toHaveBeenCalledWith("/done")
// ------------------------------------------------
test("กดบันทึกต้องพาไป /done", async () => {
  const user = userEvent.setup();
  render(<SaveAndGo />);
  await user.click(screen.getByRole("button", { name: "บันทึก" }));
  expect(push).toHaveBeenCalledWith("/done");
});


// ------------------------------------------------
// ข้อ 3: mock เป็นตัวแปรร่วมของทั้งไฟล์ ถ้าไม่ล้าง จำนวนครั้งที่เรียกจะสะสมข้าม test
// แนวทาง: เพิ่ม beforeEach(() => { vi.clearAllMocks(); }) (import beforeEach จาก "vitest" ด้วย)
//          แล้วเขียน test ที่กด "ย้อนกลับ" และตรวจว่า back ถูกเรียก "1 ครั้ง" พอดี
//          (ข้อ 1 กดไปแล้ว 1 ครั้ง ถ้าไม่ล้างค่า จะนับเป็น 2)
// ------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks();
});

test("ล้าง mock ก่อนทุก test จึงนับเริ่มจาก 0", async () => {
  const user = userEvent.setup();
  render(<BackButton />);
  await user.click(screen.getByRole("button", { name: "ย้อนกลับ" }));
  expect(back).toHaveBeenCalledTimes(1);
});
