/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import authentication from '../Authentication'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Somos from '../../static/imagesLogin/logo.png'
import apiURL from '../fetch'
import './Login.css'

/* Form para ingresar a los recursos */
const Login = () => {
  const history = useHistory()
  const [account, setAccount] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    })
  }

  console.log('prueba de CI')

  // Revisando que la cuenta exista
  const existingAccounts = async () => {
    const { username } = account
    const { password } = account
    let status

    const json = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      status = res.status
      return res.json()
    })

    console.log(json, status)

    if (status === 200) {
      setError('')
      const { somoskey } = json
      authentication.onAuthentication()
      localStorage.setItem('username', username)
      localStorage.setItem('somoskey', somoskey)
      if (!json.isSOMOS) {
        history.push('/client')
      } else if (json.isSOMOS) {
        history.push('/admin')
      }
    } else if (json.username === 'ERROR 101') {
      setError('Usuario incorrecto')
    } else if (json.username === 'ERROR 102') {
      setError('Contraseña incorrecta')
    } else if (json.username === 'ERROR 103') {
      setError('Usuario desactivado')
    } else if (json.username === 'ERROR') {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="LoginContainer">
      <div id="Login">
        <img src={Somos} alt="Somos Logo" />
        <Input className="InputLogin" type="text" name="username" placeholder="&#xF007; Username" onChange={handleChange} onEnter={existingAccounts} />
        <Input className="InputLogin" type="password" name="password" placeholder="&#xF023; Password" onChange={handleChange} onEnter={existingAccounts} />
        <Button id="SignIn" name="Entrar" onClick={existingAccounts} />
        <Button id="forgot" name="¿Olvidó su contraseña?" onClick={() => history.push('./forgotPassword')} />
        <Error error={error} />
      </div>

      <div className="footer">
        <h1 onClick={() => history.push('./serviceProvider')}>Brindar un servicio</h1>
      </div>
    </div>
  )
}

export default Login
