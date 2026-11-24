// ป้ายเล็กๆ ถ้าส่ง href มาจะเป็นลิงก์ ถ้าไม่ส่งจะเป็นข้อความธรรมดา
export function Badge({
  label,
  variant = "info",
  href,
}: {
  label: string;
  variant?: "info" | "danger";
  href?: string;
}) {
  const className = `badge badge-${variant}`;
  if (href) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }
  return <span className={className}>{label}</span>;
}
