import { useTheme } from "./ThemeContext";

// ปุ่มแสดงธีมปัจจุบัน และกดเพื่อสลับ
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>ธีม: {theme}</button>;
}
