import type { Todo, CreateTodoInput, TodoFilter, ApiResponse } from '../types/todo';

const BASE_URL = '/api/todos';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json: ApiResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || 'Unknown error');
  }
  return json.data;
}

export function fetchTodos(filter: TodoFilter = 'all'): Promise<Todo[]> {
  return request<Todo[]>(`${BASE_URL}?filter=${filter}`);
}

export function createTodo(input: CreateTodoInput): Promise<Todo> {
  return request<Todo>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function toggleTodo(id: string): Promise<Todo> {
  return request<Todo>(`${BASE_URL}/${id}`, { method: 'PATCH' });
}

export function deleteTodo(id: string): Promise<{ id: string }> {
  return request<{ id: string }>(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
