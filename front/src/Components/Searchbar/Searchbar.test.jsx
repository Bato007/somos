import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Searchbar from './Searchbar'

describe('Searchbar tests', () => {
  test('Searchbar renders', () => {
    render(<Searchbar availableResources={[{ title: 'prueba1.png', resource: 'png' }]} />)
  })
  test('Searchbar is typeable', () => {
    const searchbar = render(<Searchbar availableResources={[{ title: 'prueba1.png', resource: 'png' }]} />)

    const hasInputValue = (test, inputValue) => screen.getByDisplayValue(inputValue) === test

    const input = searchbar.getByRole('textbox')

    userEvent.type(input, 'prueba')
    expect(hasInputValue(input, 'prueba')).toBe(true)
  })
  test('Searchbar shows results', () => {
    const searchbar = render(<Searchbar search="prueba" availableResources={[{ title: 'prueba1.png', resource: 'png' }]} />)
    const button = searchbar.getByRole('button')
    userEvent.click(button)

    expect(screen.getElementsByClassName('resourcePreview').length).toBe(1)
  })
})
