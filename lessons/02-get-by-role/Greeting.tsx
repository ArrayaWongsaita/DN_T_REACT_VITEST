// ทักทายตามชื่อที่ส่งมาทาง props พร้อมปุ่มหนึ่งปุ่ม
export function Greeting({ name }: { name: string }) {
  return (
    <section>
      <h2>สวัสดี {name}</h2>
      <button>ทักทาย</button>
    </section>
  );
}
