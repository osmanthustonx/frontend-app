# Engineering Design: TodoList CRUD (Frontend)

## Component Architecture
App > AddTodoForm + FilterBar + TodoList > TodoItem

## State Management
useTodos custom hook with useState (todos, filter, loading, error)

## API Integration
src/api/todoApi.ts — fetch wrapper for all CRUD endpoints

## Error Handling
API errors caught in useTodos, stored in error state, displayed inline.
