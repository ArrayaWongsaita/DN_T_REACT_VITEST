# DN_T_REACT_VITEST — ฝึกเขียน test ให้ React Component ด้วย Vitest

repo นี้คือแบบฝึกหัด 17 บท สำหรับคนที่เขียน React/Next.js เป็นแล้ว แต่ยังไม่เคยเขียน test ฝั่ง Frontend ทุกบทมี component เล็กๆ ที่เตรียมไว้ให้ และไฟล์ `.test.tsx` ที่บอกว่าให้ทดสอบอะไร ค่อยๆ เพิ่มเครื่องมือทีละนิด ตั้งแต่ `render` และ `getByText` ไปจนถึง `userEvent`, mock `fetch` และ mock `next/navigation`

เครื่องมือที่ใช้: Vitest + React Testing Library + user-event + jest-dom (รันบน jsdom)

## ติดตั้ง

```bash
git clone https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST.git
cd DN_T_REACT_VITEST
pnpm install
pnpm test setup-check   # ต้องขึ้น 2 passed ถ้าเห็นแบบนี้ แปลว่าติดตั้งสำเร็จ
```

ต้องใช้ Node 20 ขึ้นไป และ [pnpm](https://pnpm.io/installation) (ถ้ายังไม่มี: `npm i -g pnpm`)

## วิธีทำแบบฝึกหัด

1. เปิดโฟลเดอร์ของบท เช่น `lessons/01-first-render/`
2. อ่านไฟล์ component เช่น `Hello.tsx` ให้เข้าใจว่าแสดงอะไร
3. เปิดไฟล์ `.test.tsx` คู่กัน อ่านคำอธิบายด้านบนและโจทย์แต่ละข้อ
4. ลบบรรทัด `test.todo(...)` ของข้อนั้น แล้วเขียน `test("ชื่อ", () => { ... })` ตรงจุดที่มี 👉
5. รัน test ดูผล ทำทีละข้อ

## วิธีรัน

```bash
pnpm test                          # รันทุกบท
pnpm test lessons/01               # รันเฉพาะบท 01
pnpm test:watch                # รันซ้ำอัตโนมัติทุกครั้งที่บันทึกไฟล์
```

## วิธีอ่านผล

- `todo` = ข้อที่ยังไม่ได้เขียน ยังไม่นับว่าผ่าน (ไม่ทำให้ `pnpm test` ล้ม)
- `✓` = test ผ่าน
- `✕` = test ไม่ผ่าน ดูส่วน **Expected** (ค่าที่เราคาดหวัง) เทียบกับ **Received** (ค่าที่ได้จริง) และ error ที่บอกว่า "Unable to find an element..." แปลว่าหา element ไม่เจอ
- ถ้า error ขึ้นข้อความ DOM ยาวๆ ให้ไล่ดูว่าบนหน้า (jsdom) มีอะไรอยู่จริง

## สารบัญ

ใบ้สรุป query และ matcher ทั้งหมดอยู่ที่ [`docs/cheatsheet.md`](docs/cheatsheet.md)

### ช่วงที่ 1: Render และค้นหา (บท 01-07)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 01 | `01-first-render` | `render`, `getByText`, `toBeInTheDocument` |
| 02 | `02-get-by-role` | `getByRole`, `{ name }`, props |
| 03 | `03-text-content` | `toHaveTextContent` |
| 04 | `04-attributes-classes` | `toHaveAttribute`, `toHaveClass` |
| 05 | `05-conditional-render` | `queryBy...`, `.not.toBeInTheDocument` |
| 06 | `06-lists` | `getAllByRole`, `toHaveLength` |
| 07 | `07-form-state` | `getByLabelText`, `toHaveValue`, `toBeChecked`, `toBeDisabled`, `toBeEnabled` |

### ช่วงที่ 2: จำลองการใช้งาน (บท 08-10)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 08 | `08-click-counter` | `userEvent.setup`, `user.click` |
| 09 | `09-typing` | `user.type`, `user.clear` |
| 10 | `10-callback-props` | `vi.fn`, `toHaveBeenCalledWith` |

### ช่วงที่ 3: ของที่มาทีหลัง (บท 11-13)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 11 | `11-loading-then-data` | `findBy...`, `waitFor` |
| 12 | `12-mock-fetch` | `vi.spyOn(globalThis, "fetch")` |
| 13 | `13-error-empty-states` | `mockRejectedValue`, สถานะ error/empty |

### ช่วงที่ 4: Advanced หลาย component รวมกัน (บท 14-17)

| บท | โฟลเดอร์ | ฝึก |
|---|---|---|
| 14 | `14-todo-app` | เทส component แม่ที่ประกอบจากลูกหลายตัว |
| 15 | `15-context-provider` | custom render ด้วย `wrapper` |
| 16 | `16-form-validation` | ฟอร์มทั้งฟอร์ม พิมพ์ กด ตรวจ error |
| 17 | `17-next-navigation` | `vi.mock("next/navigation")` |

## ข้อควรรู้

- คอร์สนี้ทดสอบ Client Component และ component ธรรมดา **ไม่ครอบคลุม Server Component** (async component) เพราะ Vitest + React Testing Library เรนเดอร์ตัวนั้นตรงๆ ไม่ได้
- อยากลองต่อยอด: Vitest มี Browser Mode (`vitest-browser-react`) ที่รัน test บนเบราว์เซอร์จริง ต้องติดตั้งเพิ่ม (เช่น Playwright) จึงไม่ได้รวมเป็นบทในคอร์สนี้

## เฉลย

เปิดดูบนเว็บได้ที่ https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST/tree/solutions/lessons ลองทำเองก่อนแล้วค่อยเปิดดู
