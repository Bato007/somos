import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import authentication from '../Authentication'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Somos from '../../static/imagesLogin/logo.png'
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

  // Revisando que la cuenta exista
  const existingAccounts = async () => {
    const { username } = account
    const { password } = account

    const json = await fetch('http://localhost:3001/authentication/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      console.log(res.status)
      return res.json()
    })
    console.log(json.username)

    if (json.username === 'ERROR 101') {
      setError('Usuario incorrecto')
    } else if (json.username === 'ERROR 102') {
      setError('Contraseña incorrecta')
    } else if (json.username === 'ERROR 103') {
      setError('Usuario desactivado')
    } else {
      setError('')
      if (!json.isSomos) {
        authentication.onAuthentication()
        localStorage.setItem('username', username)
        history.push('/home')
      }
    }
  }

  return (
    <div className="LoginContainer">
      <div id="Login">
        <img src={Somos} alt="Somos Logo" />
        <Input className="InputLogin" type="text" name="username" placeholder="&#xF007; Username" onChange={handleChange} />
        <Input className="InputLogin" type="password" name="password" placeholder="&#xF023; Password" onChange={handleChange} />
        <Button id="SignIn" name="Sign In" onClick={existingAccounts} />
        <Error error={error} />
      </div>
    </div>
  )
}

export default Login
