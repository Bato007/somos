import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Home from '../Components/Home/Home'
import Login from '../Components/Login/Login'
import Create from '../Components/CreateAccount/Create'

// Diseño del test número 1:
// Sección 1: Creación de una nueva cuenta
//  Acceso a cuenta de administrador
//  Creación de cuenta con datos específicos
// Sección 2: Acceso a recursos
//  Login con la cuenta creada
//  Prueba de vista de un recurso

describe('Create tests', () => {
  test('Login', () => {
    render(<Login />)
  })
  test('Create render', () => {
    render(<Create />)
  })
  test('Create render', () => {
    render(<Home />)
  })
  // Logea administrador
  test('Login', async () => {
    const create = render(<Login />)
    const username = create.getByPlaceholderText(/&#xF007; Username/)
    const password = create.getByPlaceholderText(/&#xF023; Password/)
    const next = create.getByText('Sign In')

    userEvent.type(username, 'ama19020')
    userEvent.type(password, '12345678')
    userEvent.click(next)

    expect(await create.getByPlaceholderText(/Buscar.../)).toBeInTheDocument()
  })
  test('Create User', async () => {
    const create = render(<Create />)
    const username = create.getByPlaceholderText(/Usuario/)
    const password = create.getByPlaceholderText(/Introduzca su contraseña/)
    const confirm = create.getByPlaceholderText(/Confirme su contraseña/)
    const email = create.getByPlaceholderText(/Correo electrónico/)
    const name = create.getByPlaceholderText(/Nombre completo/)
    const phone = create.getByPlaceholderText(/Teléfono/)
    const place = create.getByPlaceholderText(/Residencia/)
    const next = create.getByText('Crear')

    userEvent.type(username, 'beto123')
    userEvent.type(password, 'aA#123456')
    userEvent.type(confirm, 'aA#123456')
    userEvent.type(email, 'ejemplo@gmail.com')
    userEvent.type(name, 'Juan Perez')
    userEvent.type(phone, 12341234)
    userEvent.place(place, 'Guatemala')
    userEvent.click(next)

    expect(await create.findByText('La cuenta ha sido creada con éxito')).toBeInTheDocument()
  })
  // Logea como usuario
  test('Login con cuenta creada', async () => {
    const create = render(<Login />)
    const username = create.getByPlaceholderText(/&#xF007; Username/)
    const password = create.getByPlaceholderText(/&#xF023; Password/)
    const next = create.getByText('Sign In')

    userEvent.type(username, 'beto123')
    userEvent.type(password, 'aA#123456')
    userEvent.click(next)

    expect(await create.getByPlaceholderText(/Buscar.../)).toBeInTheDocument()
  })
  test('Verifica que el usuario pueda entrar a ver el recurso', async () => {
    const create = render(<Home />)
    const resource = create.getByText('Hola')
    userEvent.click(resource)

    expect(await create.getByText('ayuda a familias')).toBeInTheDocument()
  })
})
