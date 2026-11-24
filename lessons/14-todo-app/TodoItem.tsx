export type Todo = { id: number; text: string; done: boolean };

// งานหนึ่งรายการ มี checkbox ไว้ติ๊กว่าทำเสร็จแล้ว
export function TodoItem({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
}) {
  return (
    <li>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        {todo.text}
      </label>
    </li>
  );
}
