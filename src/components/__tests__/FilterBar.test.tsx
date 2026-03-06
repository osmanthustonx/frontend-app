import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';

describe('FilterBar', () => {
  it('renders three filter buttons', () => {
    render(<FilterBar current="all" onChange={vi.fn()} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('highlights current filter', () => {
    render(<FilterBar current="active" onChange={vi.fn()} />);
    expect(screen.getByText('Active')).toHaveClass('active');
    expect(screen.getByText('All')).not.toHaveClass('active');
  });

  it('calls onChange with correct filter value', () => {
    const onChange = vi.fn();
    render(<FilterBar current="all" onChange={onChange} />);
    fireEvent.click(screen.getByText('Completed'));
    expect(onChange).toHaveBeenCalledWith('completed');
  });
});
