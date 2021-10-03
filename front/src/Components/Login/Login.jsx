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
    let status

    const json = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      status = res.status
      return res.json()
    })

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
    }
  }

  return (
    <div className="LoginContainer">
      <div id="Login">
        <img src={Somos} alt="Somos Logo" />
        <Input className="InputLogin" type="text" name="username" placeholder="&#xF007; Username" onChange={handleChange} onEnter={existingAccounts} />
        <Input className="InputLogin" type="password" name="password" placeholder="&#xF023; Password" onChange={handleChange} onEnter={existingAccounts} />
        <Button id="SignIn" name="Sign In" onClick={existingAccounts} />
        <Button id="forgot" name="¿olvidó su contraseña?" onClick={() => history.push('./forgotPassword')} />
        <Error error={error} />
      </div>
    </div>
  )
}

export default Login
