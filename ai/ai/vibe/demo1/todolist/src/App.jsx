import { useState } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState([])

  const handleAdd = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false }
    ])
  }

  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const reordered = Array.from(todos)
    const [removed] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, removed)
    setTodos(reordered)
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="max-w-lg mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📝 TodoList
      </h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onDragEnd={handleDragEnd}
      />
      {todos.length > 0 && (
        <p className="text-center text-gray-500 text-sm mt-4">
          {completedCount} / {todos.length} 已完成
        </p>
      )}
    </div>
  )
}
