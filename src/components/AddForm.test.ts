import {render, fireEvent} from '@testing-library/vue'
import {describe, it, expect} from 'vitest'
import AddForm from './AddForm.vue'

describe('AddForm', () => {
    it('Event "add" is fired when text input have text and text input is cleared after event is emitted', async () => {
        const {getByTestId, emitted} = render(AddForm)

        const textInput = getByTestId('task-input') as HTMLInputElement
        const button = getByTestId('add-button')

        await fireEvent.update(textInput, 'New Task')
        expect(textInput.value).toBe('New Task')


        await fireEvent.click(button)
        expect(emitted().add).toBeTruthy()
        expect(emitted().add.length).toBe(1)
        expect(textInput.value.length).toBe(0)
    })
    it('Event "add" doesn`t emits when text input have no value', async () => {
        const {getByTestId, emitted} = render(AddForm)

        const textInput = getByTestId('task-input') as HTMLInputElement
        const button = getByTestId('add-button')

        await fireEvent.update(textInput, '')
        expect(textInput.value).toBe('')

        await fireEvent.click(button)
        expect(emitted().add).toBeUndefined()

        expect(textInput.value.length).toBe(0)
    })
})