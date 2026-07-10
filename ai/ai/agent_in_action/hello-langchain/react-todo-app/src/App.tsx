import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './App.css'

type Filter = 'all' | 'active' | 'completed'

type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'react-todo-app.todos'
const REMOVE_ANIMATION_MS = 240

const filters: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
]

const emptyMessages: Record<Filter, { title: string; detail: string }> = {
  all: {
    title: '清单还是空的',
    detail: '写下第一件想完成的小事吧。',
  },
  active: {
    title: '没有待完成任务',
    detail: '此刻可以安心休息一下。',
  },
  completed: {
    title: '还没有完成记录',
    detail: '完成一项任务后，它会出现在这里。',
  },
}

function loadTodos(): Todo[] {
  try {
    const savedTodos = window.localStorage.getItem(STORAGE_KEY)
    if (!savedTodos) return []

    const parsedTodos: unknown = JSON.parse(savedTodos)
    if (!Array.isArray(parsedTodos)) return []

    return parsedTodos.filter((todo): todo is Todo => (
      typeof todo === 'object'
      && todo !== null
      && typeof todo.id === 'string'
      && typeof todo.text === 'string'
      && typeof todo.completed === 'boolean'
      && typeof todo.createdAt === 'number'
    ))
  } catch {
    return []
  }
}

function createTodoId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [removingIds, setRemovingIds] = useState<Set<string>>(() => new Set())
  const removalTimers = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const timers = removalTimers.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )
  const completedCount = todos.length - activeCount

  const visibleTodos = useMemo(() => todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  }), [filter, todos])

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setTodos((currentTodos) => [
      {
        id: createTodoId(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
      ...currentTodos,
    ])
    setDraft('')
    setFilter('all')
  }

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )))
  }

  const removeTodo = (id: string) => {
    if (removalTimers.current.has(id)) return

    setRemovingIds((currentIds) => new Set(currentIds).add(id))
    const timer = window.setTimeout(() => {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
      setRemovingIds((currentIds) => {
        const nextIds = new Set(currentIds)
        nextIds.delete(id)
        return nextIds
      })
      removalTimers.current.delete(id)
    }, REMOVE_ANIMATION_MS)

    removalTimers.current.set(id, timer)
  }

  const clearCompleted = () => {
    todos
      .filter((todo) => todo.completed)
      .forEach((todo) => removeTodo(todo.id))
  }

  const emptyState = emptyMessages[filter]

  return (
    <main className="app-shell">
      <section className="todo-card" aria-labelledby="app-title">
        <header className="app-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Focus list
          </div>
          <h1 id="app-title">把今天，轻轻完成。</h1>
          <p>收拢思绪，一次专注一件小事。</p>
        </header>

        <div className="stats" aria-label="任务统计">
          <div className="stat-item">
            <strong>{todos.length}</strong>
            <span>全部任务</span>
          </div>
          <div className="stat-item">
            <strong>{activeCount}</strong>
            <span>正在进行</span>
          </div>
          <div className="stat-item">
            <strong>{completedCount}</strong>
            <span>已经完成</span>
          </div>
        </div>

        <form className="todo-composer" onSubmit={addTodo}>
          <label className="sr-only" htmlFor="new-todo">输入新任务</label>
          <span className="composer-icon" aria-hidden="true">✦</span>
          <input
            id="new-todo"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={120}
            placeholder="接下来想完成什么？"
            autoComplete="off"
          />
          <button type="submit" disabled={!draft.trim()}>
            <span aria-hidden="true">＋</span>
            添加任务
          </button>
        </form>

        <div className="list-toolbar">
          <div className="filters" role="group" aria-label="筛选任务">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={filter === item.value ? 'active' : ''}
                aria-pressed={filter === item.value}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="remaining-copy">还剩 {activeCount} 项</span>
        </div>

        <section className="todo-list-panel" aria-label="任务列表">
          {visibleTodos.length > 0 ? (
            <ul className="todo-list">
              {visibleTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={`todo-item${todo.completed ? ' completed' : ''}${removingIds.has(todo.id) ? ' removing' : ''}`}
                >
                  <input
                    className="native-checkbox"
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label className="todo-check" htmlFor={`todo-${todo.id}`}>
                    <span className="check-mark" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="m3.2 8.2 3 3 6.6-6.6" />
                      </svg>
                    </span>
                    <span className="todo-text">{todo.text}</span>
                  </label>
                  <button
                    type="button"
                    className="delete-button"
                    aria-label={`删除任务：${todo.text}`}
                    title="删除任务"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state" role="status">
              <div className="empty-icon" aria-hidden="true">✓</div>
              <h2>{emptyState.title}</h2>
              <p>{emptyState.detail}</p>
            </div>
          )}
        </section>

        <footer className="app-footer">
          <span>完成的每一步，都值得被看见。</span>
          <button
            type="button"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            清除已完成
          </button>
        </footer>
      </section>
    </main>
  )
}

export default App
