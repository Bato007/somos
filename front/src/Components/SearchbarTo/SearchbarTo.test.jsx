import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchbarTo from './SearchbarTo'

describe('Searchbar To tests', () => {
  test('Searchbar To renders', () => {
    render(<SearchbarTo />)
  })
  test('Searchbar To receives input', () => {
    render(<SearchbarTo />)

    const hasInputValue = (test, inputValue) => {
      return screen.getByDisplayValue(inputValue) === test
    }

    const input = screen.getByRole('input')

    userEvent.type(input, 'bato')
    expect(hasInputValue(input, "bato")).toBe(true)
  })
  test('Searchbar To shows contacts on button click', () => {
    const searchbarTo = render(<SearchbarTo />)
    const button = searchbarTo.getByRole('button')
    userEvent.click(button)

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })
})