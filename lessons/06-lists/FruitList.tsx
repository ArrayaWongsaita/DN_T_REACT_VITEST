// แสดงรายการผลไม้ ถ้าไม่มีให้แสดงข้อความแทน
export function FruitList({ items }: { items: string[] }) {
  if (items.length === 0) return <p>ไม่มีรายการ</p>;
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
