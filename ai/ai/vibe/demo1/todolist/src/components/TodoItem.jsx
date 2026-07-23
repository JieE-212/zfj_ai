import { Draggable } from '@hello-pangea/dnd'

export default function TodoItem({ todo, index, onToggle, onDelete }) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 transition-shadow ${
            snapshot.isDragging
              ? 'shadow-lg ring-2 ring-blue-200'
              : 'hover:shadow-md'
          }`}
        >
          <span
            {...provided.dragHandleProps}
            className="text-gray-400 cursor-grab active:cursor-grabbing select-none text-lg leading-none"
            title="拖拽排序"
          >
            ⠿
          </span>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <span
            className={`flex-1 text-gray-800 ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-400 hover:text-red-600 transition-colors text-sm font-medium"
          >
            删除
          </button>
        </li>
      )}
    </Draggable>
  )
}
