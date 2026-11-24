import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeProvider } from "./ThemeContext";

// render ที่หุ้ม component ด้วย ThemeProvider ให้เอง
// wrapper = component ที่ RTL ใช้ครอบสิ่งที่เรา render อีกชั้นหนึ่ง
export function renderWithTheme(ui: ReactElement, initial: "light" | "dark" = "light") {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider initial={initial}>{children}</ThemeProvider>,
  });
}
