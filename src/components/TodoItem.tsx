import type { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle ${todo.title}`}
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && <p className="todo-description">{todo.description}</p>}
      </div>
      <button onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.title}`}>
        Delete
      </button>
    </li>
  );
}
