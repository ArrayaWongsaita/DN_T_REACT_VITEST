import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeValue = { theme: Theme; toggle: () => void };

const ThemeContext = createContext<ThemeValue>({ theme: "light", toggle: () => {} });

// ให้ธีม (light/dark) กับ component ที่อยู่ข้างใน
export function ThemeProvider({
  children,
  initial = "light",
}: {
  children: ReactNode;
  initial?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initial);
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
