import React from 'react'
import { render, screen , fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input tests', () => {
  test('Input renders', () => {
    render(<Input />)
  })
  test('Input is typeable', () => {
    const hasInputValue = (e, inputValue) => {
      return screen.getByDisplayValue(inputValue) === e
    }

    render(<Input name='username' placeholder="Username" />)
    const username = screen.getByPlaceholderText(/Username/)

    fireEvent.change(username, { target: { value: 'bato' } })

    expect(hasInputValue(username, "bato")).toBe(true)
  })
})
