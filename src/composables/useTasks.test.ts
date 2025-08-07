import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNotes } from './useTasks'  
import type Task from '../models/Task'
import { nextTick } from 'vue'

describe('useNotes composable', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem(key: string) {
        return store[key] || null
      },
      setItem(key: string, value: string) {
        store[key] = value
      },
      clear() {
        store = {}
      }
    }
  })()

  beforeEach(() => {
    localStorageMock.clear()
    vi.stubGlobal('localStorage', localStorageMock)
  })

  it('initializes tasks from localStorage', () => {
    const fakeTasks: Task[] = [
      { id: 1, task: 'Test Task 1', done: false },
      { id: 2, task: 'Test Task 2', done: true },
    ]
    localStorageMock.setItem('tasks', JSON.stringify(fakeTasks))

    const { tasks } = useNotes()
    expect(tasks.value).toEqual(fakeTasks)
  })

  it('addTask adds a new task', async () => {
    const { tasks, addTask } = useNotes()

    addTask('New Task')
    await nextTick()

    expect(tasks.value.length).toBe(1)
    expect(tasks.value[0]).toMatchObject({
      task: 'New Task',
      done: false,
    })
  })

  it('removeTask removes a task by id', async () => {
    const { tasks, addTask, removeTask } = useNotes()

    addTask('Task to remove')
    await nextTick()

    const id = tasks.value[0].id
    removeTask(id)
    await nextTick()

    expect(tasks.value.find(t => t.id === id)).toBeUndefined()
  })

  it('toggleDone toggles the done state of a task', async () => {
    const { tasks, addTask, toggleDone } = useNotes()

    addTask('Toggle task')
    await nextTick()

    const id = tasks.value[0].id
    expect(tasks.value[0].done).toBe(false)

    toggleDone(id)
    await nextTick()
    expect(tasks.value[0].done).toBe(true)

    toggleDone(id)
    await nextTick()
    expect(tasks.value[0].done).toBe(false)
  })

  it('saves changes to localStorage when tasks change', async () => {
    const { tasks, addTask } = useNotes()

    addTask('Persisted task')
    await nextTick()

    const stored = localStorageMock.getItem('tasks')
    expect(stored).not.toBeNull()
    if (stored) {
      const parsed = JSON.parse(stored)
      expect(Array.isArray(parsed)).toBe(true)
      expect(parsed.length).toBeGreaterThan(0)
      expect(parsed[0].task).toBe('Persisted task')
    }
  })

  it('handles errors when parsing invalid JSON from localStorage', () => {
    localStorageMock.setItem('tasks', 'not a valid json')
    const { tasks } = useNotes()

    expect(tasks.value).toEqual([])
  })
})
