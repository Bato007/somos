import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Upload from './Upload'

describe('Upload test', () => {
  test('Upload renders', () => {
    render(<Upload />)
  })
  test('Title needs at least one char', async () => {
    const upload = render(<Upload />)
    const title = upload.getByPlaceholderText('Nombre del archivo')
    const button = upload.getByText('Subir')

    userEvent.type(title, '')
    userEvent.click(button)

    expect(await upload.findByText('Por favor, llena todos los campos')).toBeInTheDocument()
  })
})