import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Create from './Create'

describe('Create tests', () => {
  test('Create render', () => {
    render(<Create />)
  })
  test('Not same passwords', async () => {
    const create = render(<Create />)
    const username = create.getByPlaceholderText(/Usuario/)
    const password = create.getByPlaceholderText(/Introduzca su contraseña/)
    const confirm = create.getByPlaceholderText(/Confirme su contraseña/)
    const next = create.getByText('Continuar →')

    userEvent.type(username, 'ama19020')
    userEvent.type(password, '12345678')
    userEvent.type(confirm, '87654321')
    userEvent.click(next)

    expect(await create.findByText('Las contraseñas no coinciden')).toBeInTheDocument()
  })
})
