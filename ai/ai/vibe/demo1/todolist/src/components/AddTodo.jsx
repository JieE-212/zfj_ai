import { useState } from 'react'

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入新的待办事项..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        添加
      </button>
    </form>
  )
}
