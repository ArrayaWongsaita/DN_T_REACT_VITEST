import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello() {
  return <p>hello</p>;
}

describe("เช็กการติดตั้ง", () => {
  test("เห็น hello บนหน้า", () => {
    render(<Hello />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  test("test ถัดไป DOM ต้องถูกล้างแล้ว", () => {
    render(<Hello />);
    expect(screen.getAllByText("hello")).toHaveLength(1);
  });
});
