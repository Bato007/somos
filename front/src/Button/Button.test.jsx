import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button tests', () => {
  test('Button renders', () => {
    render(<Button />)
  })
  test('Button is clickable', () => {
    const spy = jest.fn()
    const button = render(<Button onClick={spy} name='Dummy' />)
    userEvent.click(button.getByText('Dummy'))

    expect(spy).toHaveBeenCalled()
  })
})
