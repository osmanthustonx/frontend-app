import { useState } from 'react';
import type { CreateTodoInput } from '../types/todo';

interface Props {
  onAdd: (input: CreateTodoInput) => Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmed = title.trim();
    if (!trimmed) {
      setValidationError('Title is required');
      return;
    }
    if (trimmed.length > 200) {
      setValidationError('Title must be 200 characters or less');
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({ title: trimmed, description: description.trim() || undefined });
      setTitle('');
      setDescription('');
    } catch {
      // error handled by parent
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Todo title"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        aria-label="Todo description"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Todo'}
      </button>
      {validationError && <p className="error" role="alert">{validationError}</p>}
    </form>
  );
}
