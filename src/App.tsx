import { useEffect, useState, type FormEvent } from 'react'
import './App.css'

interface Task {
  id: string
  text: string
  completed: boolean
}

const STORAGE_KEY = 'task-board:tasks'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setInput('')
  }

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <h1>タスクボード</h1>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit">追加</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && <li className="empty">タスクはありません</li>}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'task completed' : 'task'}
          >
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button
              type="button"
              className="delete-button"
              onClick={() => handleDeleteTask(task.id)}
              aria-label={`${task.text}を削除`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
