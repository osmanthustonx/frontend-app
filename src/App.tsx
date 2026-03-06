import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import './App.css';

export function App() {
  const { todos, filter, setFilter, loading, error, addTodo, toggle, remove } = useTodos();

  return (
    <div className="app">
      <h1>TodoList</h1>
      <AddTodoForm onAdd={addTodo} />
      <FilterBar current={filter} onChange={setFilter} />
      {error && <p className="error" role="alert">{error}</p>}
      {loading ? <p>Loading...</p> : <TodoList todos={todos} onToggle={toggle} onDelete={remove} />}
    </div>
  );
}
