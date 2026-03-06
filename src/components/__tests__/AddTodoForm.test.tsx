import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodoForm } from '../AddTodoForm';

describe('AddTodoForm', () => {
  it('renders form elements', () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    expect(screen.getByLabelText('Todo title')).toBeInTheDocument();
    expect(screen.getByLabelText('Todo description')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  it('shows error when submitting empty title', async () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    fireEvent.click(screen.getByText('Add Todo'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Title is required');
  });

  it('shows error when title exceeds 200 chars', async () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Todo title'), {
      target: { value: 'a'.repeat(201) },
    });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(await screen.findByRole('alert')).toHaveTextContent('Title must be 200 characters or less');
  });

  it('calls onAdd with valid input', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined);
    render(<AddTodoForm onAdd={onAdd} />);
    fireEvent.change(screen.getByLabelText('Todo title'), {
      target: { value: 'Buy milk' },
    });
    fireEvent.click(screen.getByText('Add Todo'));
    expect(onAdd).toHaveBeenCalledWith({ title: 'Buy milk', description: undefined });
  });
});
