# Cheat-sheet: query และ matcher ที่ใช้ในคอร์ส

## เลือก query ให้ถูก

| ต้องการ | ใช้ | ถ้าไม่เจอ |
|---|---|---|
| ของที่ "ต้องมีอยู่แล้ว" | `getBy...` | throw error |
| ของที่ "ต้องไม่มี" | `queryBy...` | คืน `null` |
| ของที่ "จะมาทีหลัง" (async) | `await findBy...` | รอแล้ว error เมื่อหมดเวลา |
| หลายตัว | `getAllBy...`, `queryAllBy...`, `findAllBy...` | คืน array |

## เลือกหาด้วยอะไร (เรียงจากควรลองก่อน)

1. `getByRole("button", { name: "ส่ง" })` ตรงกับที่ผู้ใช้และโปรแกรมอ่านหน้าจอเห็น
2. `getByLabelText("อีเมล")` สำหรับช่องกรอกในฟอร์ม
3. `getByText("ข้อความ")` สำหรับข้อความบนหน้า

role ที่เจอบ่อย: `button`, `heading`, `link`, `textbox`, `checkbox`, `list`, `listitem`, `alert`

## Matcher จาก jest-dom (บท)

| Matcher | ตรวจอะไร | บท |
|---|---|---|
| `toBeInTheDocument()` | อยู่บนหน้า (`.not` = ไม่อยู่) | 01, 05 |
| `toHaveTextContent("...")` | ข้อความใน element | 03 |
| `toHaveAttribute("href", "/x")` | attribute | 04 |
| `toHaveClass("a")` | มี class | 04 |
| `toHaveValue("...")` | ค่าในช่อง input | 07, 09 |
| `toBeChecked()` | checkbox ถูกติ๊ก | 07, 14 |
| `toBeDisabled()` / `toBeEnabled()` | ปิด/เปิดใช้งาน | 07 |

## Matcher ของ Vitest (เหมือน Jest)

| Matcher | ตรวจอะไร | บท |
|---|---|---|
| `toBe`, `toEqual` | ค่าเท่ากัน | 01 |
| `toHaveLength(n)` | ความยาว array | 06 |
| `toHaveBeenCalled()` / `.not` | ถูกเรียก | 10, 17 |
| `toHaveBeenCalledTimes(n)` | ถูกเรียกกี่ครั้ง | 10 |
| `toHaveBeenCalledWith(...)` | ถูกเรียกด้วยค่าอะไร | 10, 16 |

## จำลองการใช้งาน

```tsx
const user = userEvent.setup();               // ต้นแต่ละ test
await user.click(screen.getByRole("button", { name: "+1" }));
await user.type(screen.getByLabelText("ชื่อ"), "Mali");
await user.clear(screen.getByLabelText("ชื่อ"));
```

## Mock

| ต้องการ | ใช้ |
|---|---|
| ฟังก์ชันปลอมส่งเข้า props | `vi.fn()` |
| ปลอม fetch | `vi.spyOn(globalThis, "fetch").mockResolvedValue(...)` / `.mockRejectedValue(...)` |
| ปลอมทั้งโมดูล | `vi.mock("module", () => ({ ... }))` + `vi.hoisted` |
| คืนของจริงหลังจบ | `vi.restoreAllMocks()` ใน `afterEach` |
