import type { TodoFilter } from '../types/todo';

interface Props {
  current: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterBar({ current, onChange }: Props) {
  return (
    <div className="filter-bar" role="tablist">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          role="tab"
          aria-selected={current === value}
          className={current === value ? 'active' : ''}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
