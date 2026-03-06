import { useState, useEffect, useCallback } from 'react';
import type { Todo, TodoFilter, CreateTodoInput } from '../types/todo';
import * as api from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTodos(filter);
      setTodos(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (input: CreateTodoInput) => {
    setError(null);
    try {
      await api.createTodo(input);
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create todo');
      throw e;
    }
  };

  const toggle = async (id: string) => {
    setError(null);
    try {
      await api.toggleTodo(id);
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to toggle todo');
    }
  };

  const remove = async (id: string) => {
    setError(null);
    try {
      await api.deleteTodo(id);
      await loadTodos();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete todo');
    }
  };

  return { todos, filter, setFilter, loading, error, addTodo, toggle, remove };
}
