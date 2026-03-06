export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}
