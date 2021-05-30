import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Searchbar from './Searchbar'

describe('Searchbar tests', () => {
  test('Searchbar renders', () => {
    render(<Searchbar />)
  })
  test('Searchbar is typeable', () => {
    const searchbar = render(<Searchbar />)

    const hasInputValue = (test, inputValue) => {
      return screen.getByDisplayValue(inputValue) === test
    }

    const input = searchbar.getByRole('input')

    userEvent.type(input, 'prueba')
    expect(hasInputValue(input, 'prueba')).toBe(true)
  })
  test('Searchbar shows results', () => {
    const searchbar = render(<Searchbar search="prueba" />)
    const button = searchbar.getByRole('button')
    userEvent.click(button)
    
    expect(screen.getElementsByClassName('resourcePreview').length).toBe(4);
  })
})