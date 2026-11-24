import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// globals ปิดอยู่ RTL จึงล้าง DOM ให้เองไม่ได้ ต้องสั่งเองหลังทุก test
afterEach(() => {
  cleanup();
});
