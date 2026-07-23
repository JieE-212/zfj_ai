import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onDelete, onDragEnd }) {
  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-5xl mb-4">📋</p>
        <p>还没有待办事项，上方输入添加吧</p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
