import { useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import type { Todo } from "./TodoItem";

// แอปรายการงาน: ประกอบ TodoInput + TodoList และนับจำนวนงานที่ยังไม่เสร็จ
export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const add = (text: string) =>
    setTodos((prev) => [...prev, { id: prev.length + 1, text, done: false }]);
  const toggle = (id: number) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main>
      <TodoInput onAdd={add} />
      <TodoList todos={todos} onToggle={toggle} />
      <p>เหลือ {remaining} รายการ</p>
    </main>
  );
}
