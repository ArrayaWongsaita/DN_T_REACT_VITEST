// แสดงราคาพร้อมสกุลเงิน (ค่าเริ่มต้นเป็น THB)
export function PriceTag({
  price,
  currency = "THB",
}: {
  price: number;
  currency?: string;
}) {
  return (
    <p>
      {price} {currency}
    </p>
  );
}
