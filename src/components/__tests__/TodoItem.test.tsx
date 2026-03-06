import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from '../TodoItem';
import type { Todo } from '../../types/todo';

const baseTodo: Todo = {
  id: '1',
  title: 'Test todo',
  completed: false,
  createdAt: '2026-03-06T00:00:00Z',
  updatedAt: '2026-03-06T00:00:00Z',
};

describe('TodoItem', () => {
  it('renders todo title', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('shows strikethrough when completed', () => {
    const completed = { ...baseTodo, completed: true };
    const { container } = render(<TodoItem todo={completed} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(container.querySelector('.completed')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox clicked', () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={onToggle} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByLabelText('Toggle Test todo'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText('Delete Test todo'));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('renders description when present', () => {
    const withDesc = { ...baseTodo, description: 'Some details' };
    render(<TodoItem todo={withDesc} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });
});
