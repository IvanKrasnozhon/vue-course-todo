import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Todos from './Todos.vue'
import type Task from '../models/Task'
import '@testing-library/jest-dom'

describe('Todos.vue', () => {
  const mockTasks: Task[] = [
    { id: 1, task: 'Task 1', done: false },
    { id: 2, task: 'Task 2', done: true },
  ]

  it('renders task list when tasks are provided', () => {
    render(Todos, {
      props: {
        tasks: mockTasks
      }
    })

    const list = screen.getByTestId('tasks')
    expect(list).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')
    expect(items.length).toBe(mockTasks.length)
    expect(items[0].textContent).toContain('Task 1')
    expect(items[1].textContent).toContain('Task 2')
  })

  it('shows "no tasks" message when tasks list is empty', () => {
    render(Todos, {
      props: {
        tasks: []
      }
    })

    const message = screen.getByTestId('no-tasks-message')
    expect(message).toBeInTheDocument()
    expect(message.textContent).toContain('There are no tasks added!')
  })

  it('emits "remove" event when remove button is clicked', async () => {
    const { emitted } = render(Todos, {
      props: {
        tasks: mockTasks
      }
    })

    const removeButtons = screen.getAllByRole('button', { name: /remove/i })
    await fireEvent.click(removeButtons[0])

    expect(emitted().remove).toBeTruthy()
    expect(emitted().remove[0]).toEqual([1]) // task id
  })

  it('emits "changeState" event when checkbox is clicked', async () => {
    const { emitted } = render(Todos, {
      props: {
        tasks: mockTasks
      }
    })

    const checkboxes = screen.getAllByRole('checkbox')
    await fireEvent.click(checkboxes[0])

    expect(emitted().changeState).toBeTruthy()
    expect(emitted().changeState[0]).toEqual([1]) // task id
  })
})
