import { test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackButton } from "./BackButton";
import { SaveAndGo } from "./SaveAndGo";

// ================================================
// บทที่ 17 (Advanced): ปลอม next/navigation
// ฝึก: vi.mock, vi.hoisted, not.toHaveBeenCalled
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
// ข้อ 3: ข้อ 1 กด "ย้อนกลับ" ไปแล้ว แต่ test ใหม่ต้องเริ่มนับจาก 0 ใหม่
//        (Vitest ล้างประวัติการเรียกของ mock ให้เองก่อนทุก test เพราะตั้งค่า clearMocks เป็น true เป็นค่าเริ่มต้น)
// แนวทาง: render(<SaveAndGo />) แล้วยังไม่กดอะไร ตรวจว่า back ยัง "ไม่ถูกเรียก" และ push ยัง "ไม่ถูกเรียก"
//          ด้วย expect(...).not.toHaveBeenCalled()
// ------------------------------------------------
test.todo("test ใหม่ต้องเริ่มนับ mock จาก 0");
// 👉 เขียน test ของข้อ 3 ตรงนี้
