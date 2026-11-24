import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NameForm } from "./NameForm";

// ================================================
// บทที่ 09: จำลองการพิมพ์
// ฝึก: await user.type, await user.clear, toHaveValue
//
//   await user.type(ช่อง, "Mali")   พิมพ์ทีละตัวอักษรเหมือนผู้ใช้จริง
//   await user.clear(ช่อง)          ล้างข้อความในช่อง
//   expect(ช่อง).toHaveValue("Mali")  ตรวจค่าในช่อง
//
// หาช่องกรอกด้วยชื่อ label: screen.getByLabelText("ชื่อ")
//
// ตัวอย่าง:
//   const user = userEvent.setup();
//   render(<NameForm />);
//   await user.type(screen.getByLabelText("ชื่อ"), "A");
// ================================================


// ------------------------------------------------
// ข้อ 1: พิมพ์ "Mali" ในช่องชื่อ ช่องต้องมีค่า "Mali"
// แนวทาง: await user.type(...) แล้ว expect(...).toHaveValue("Mali")
// ------------------------------------------------
test("พิมพ์ชื่อแล้วช่องต้องมีค่าที่พิมพ์", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  await user.type(screen.getByLabelText("ชื่อ"), "Mali");
  expect(screen.getByLabelText("ชื่อ")).toHaveValue("Mali");
});


// ------------------------------------------------
// ข้อ 2: พิมพ์ "Mali" แล้วต้องเห็น "สวัสดี Mali"
// แนวทาง: ข้อความใน <p> ตรวจด้วย getByText("สวัสดี Mali")
// ------------------------------------------------
test("พิมพ์ชื่อแล้วต้องเห็นคำทักทาย", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  await user.type(screen.getByLabelText("ชื่อ"), "Mali");
  expect(screen.getByText("สวัสดี Mali")).toBeInTheDocument();
});


// ------------------------------------------------
// ข้อ 3: พิมพ์ชื่อแล้วล้างออก ต้องกลับมาเป็น "สวัสดี คนแปลกหน้า"
// แนวทาง: await user.clear(...) หลังพิมพ์
// ------------------------------------------------
test("ล้างช่องแล้วต้องทักทายคนแปลกหน้า", async () => {
  const user = userEvent.setup();
  render(<NameForm />);
  await user.type(screen.getByLabelText("ชื่อ"), "Mali");
  await user.clear(screen.getByLabelText("ชื่อ"));
  expect(screen.getByText("สวัสดี คนแปลกหน้า")).toBeInTheDocument();
});
