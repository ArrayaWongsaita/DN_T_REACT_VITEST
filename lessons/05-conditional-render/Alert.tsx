// กล่องแจ้งเตือน แสดงเมื่อ visible เป็น true เท่านั้น
export function Alert({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return <div role="alert">{message}</div>;
}
