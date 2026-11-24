// ปุ่มที่เรียก onConfirm พร้อมส่ง label กลับไปเมื่อถูกกด
export function ConfirmButton({
  label,
  onConfirm,
}: {
  label: string;
  onConfirm: (label: string) => void;
}) {
  return <button onClick={() => onConfirm(label)}>{label}</button>;
}
