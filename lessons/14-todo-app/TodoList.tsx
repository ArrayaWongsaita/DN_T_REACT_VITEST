import { TodoItem, type Todo } from "./TodoItem";

// รายการงานทั้งหมด
export function TodoList({
  todos,
  onToggle,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}
