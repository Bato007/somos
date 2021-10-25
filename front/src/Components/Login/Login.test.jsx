import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

describe('Login tests', () => {
  test('Login renders', () => {
    render(<Login />)
  })
  test('Showing login warnings', async () => {
    const login = render(<Login />)
    const username = login.getByPlaceholderText(/Username/)
    const password = login.getByPlaceholderText(/Password/)
    const submit = login.getByText('Entrar')

    userEvent.type(username, 'bato')
    userEvent.type(password, 'incorrect')
    userEvent.click(submit)

    expect(await login.findByText('Contraseña incorrecta')).toBeInTheDocument()
  })
  test('Correct login', () => {
    render(<Login />)
    const username = screen.getByPlaceholderText(/Username/)
    const password = screen.getByPlaceholderText(/Password/)
    const submit = screen.getByText('Entrar')

    fireEvent.change(username, { target: { value: 'bato' } })
    fireEvent.change(password, { target: { value: '123' } })
    fireEvent.click(submit)

    expect(screen.getByTestId('Error')).toHaveTextContent('')
  })
})
