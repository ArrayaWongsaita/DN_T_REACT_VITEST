import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmButton } from "./ConfirmButton";

// ================================================
// บทที่ 10: ฟังก์ชันปลอมส่งเข้า props
// ฝึก: vi.fn, toHaveBeenCalledTimes, toHaveBeenCalledWith, .not.toHaveBeenCalled
//
// ใน Jest เราใช้ jest.fn() ใน Vitest ใช้ vi.fn() ทำงานเหมือนกัน
// ส่งฟังก์ชันปลอมเข้าไปเป็น prop แล้วตรวจว่า component เรียกมันไหม และเรียกด้วยค่าอะไร
//
// ตัวอย่าง:
//   const onConfirm = vi.fn();
//   render(<ConfirmButton label="ตกลง" onConfirm={onConfirm} />);
//   await user.click(screen.getByRole("button", { name: "ตกลง" }));
//   expect(onConfirm).toHaveBeenCalledTimes(1);
// ================================================


// ------------------------------------------------
// ข้อ 1: ก่อนกดปุ่ม onConfirm ต้องยังไม่ถูกเรียก
// แนวทาง: render แล้วตรวจ expect(onConfirm).not.toHaveBeenCalled()
// ------------------------------------------------
test("ก่อนกดปุ่ม onConfirm ต้องยังไม่ถูกเรียก", () => {
  const onConfirm = vi.fn();
  render(<ConfirmButton label="ตกลง" onConfirm={onConfirm} />);
  expect(onConfirm).not.toHaveBeenCalled();
});


// ------------------------------------------------
// ข้อ 2: กดปุ่ม 1 ครั้ง onConfirm ต้องถูกเรียก 1 ครั้ง
// แนวทาง: await user.click(...) แล้ว toHaveBeenCalledTimes(1)
// ------------------------------------------------
test("กดปุ่ม 1 ครั้ง onConfirm ถูกเรียก 1 ครั้ง", async () => {
  const user = userEvent.setup();
  const onConfirm = vi.fn();
  render(<ConfirmButton label="ตกลง" onConfirm={onConfirm} />);
  await user.click(screen.getByRole("button", { name: "ตกลง" }));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});


// ------------------------------------------------
// ข้อ 3: onConfirm ต้องถูกเรียกพร้อมค่า label ของปุ่ม
// แนวทาง: toHaveBeenCalledWith("ตกลง")
// ------------------------------------------------
test("onConfirm ต้องถูกเรียกพร้อม label", async () => {
  const user = userEvent.setup();
  const onConfirm = vi.fn();
  render(<ConfirmButton label="ตกลง" onConfirm={onConfirm} />);
  await user.click(screen.getByRole("button", { name: "ตกลง" }));
  expect(onConfirm).toHaveBeenCalledWith("ตกลง");
});
