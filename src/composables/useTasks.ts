import { ref, watch } from 'vue'
import type Task from '../models/Task.ts'

export function useNotes() {
  const stored = localStorage.getItem('tasks')
  let parsed: Task[] = []
  try {
    parsed = stored ? JSON.parse(stored) : []
  } catch (e) {
    console.warn('Could not parse tasks from localStorage')
  }
  const tasks = ref<Task[]>(parsed)

  watch(tasks, (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }, { deep: true })

  function addTask(text: string) {
    tasks.value.push({
      id: Date.now(),
      task: text,
      done: false
    })
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter(note => note.id !== id)
  }

  function toggleDone(id: number) {
    const task = tasks.value.find(note => note.id === id)
    if (task) task.done = !task.done
  }

  return {
    tasks,
    addTask,
    removeTask,
    toggleDone,
  }
}
