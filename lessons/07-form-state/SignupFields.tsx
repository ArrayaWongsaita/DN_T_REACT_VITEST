// ฟอร์มสมัคร (อ่านอย่างเดียว) ปุ่มจะกดได้เมื่อยอมรับเงื่อนไขแล้ว
export function SignupFields({ agreed, email }: { agreed: boolean; email: string }) {
  return (
    <form>
      <label htmlFor="email">อีเมล</label>
      <input id="email" type="email" value={email} readOnly />

      <label>
        <input type="checkbox" checked={agreed} readOnly />
        ยอมรับเงื่อนไข
      </label>

      <button type="submit" disabled={!agreed}>
        สมัคร
      </button>
    </form>
  );
}
