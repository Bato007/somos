import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import apiURL from '../fetch'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Error from '../Error/Error'
import './forgotPassword.css'

const TokenForgetPass = () => {
  const history = useHistory()
  const [pass, setPass] = useState('')
  const [conf, setConf] = useState('')
  const [error, setError] = useState('')
  const [token, setToken] = useState('')

  const validarClave = (prueba) => {
    const largo = prueba.length
    if (largo < 8 || largo > 16) {
      return false
    } if (!/[a-z]/.test(prueba)) {
      return false
    } if (!/[A-Z]/.test(prueba)) {
      return false
    } if (!/[0-9]/.test(prueba)) {
      return false
    } if (!/[!"#$%&'()*+,-./:;=?@[\]^_`{|}~]/.test(prueba)) {
      return false
    }
    return true
  }

  const changePassword = async () => {
    if (pass === '') {
      setError('No se ingresó contraseña')
      return
    } if (conf === '') {
      setError('No se ingresó confirmación')
      return
    } if (token === '') {
      setError('No se ingresó el token')
      return
    } if (pass !== conf) {
      setError('Las contraseñas no coinciden')
      return
    } if (!validarClave(pass)) {
      setError('La contraseña no cumple con las condiciones')
      return
    }

    setError('')
    await fetch(`${apiURL}/recovery/token`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: pass,
        confirmPassword: conf,
        token,
      }),
    }).then((res) => {
      if (res.status === 200) {
        history.push('/')
      } else {
        setError('Token inválido')
      }
    })
  }

  return (
    <div className="forgotPass">
      <div id="forgotPass">
        <h1>Restauración de contraseña</h1>
        <div className="inputForget">
          <p>Ingrese nueva contraseña</p>
          <Input name="password" type="password" placeholder="Nueva contraseña" onChange={(event) => setPass(event.target.value)} />
        </div>
        <div className="inputForget">
          <p>Confirme nueva contraseña</p>
          <Input name="confirmPassword" type="password" placeholder="Confirmación de contraseña" onChange={(event) => setConf(event.target.value)} />
        </div>
        <div className="inputForget">
          <p>Ingrese token</p>
          <Input name="token" type="text" placeholder="Confirmación de contraseña" onChange={(event) => setToken(event.target.value)} />
        </div>
        <div className="buttonsFp">
          <Button id="returnToSignIn" name="Regresar" onClick={() => history.replace('/forgotPassword')} />
          <Button id="SignIn" name="Guardar" onClick={changePassword} />
        </div>
        <Error error={error} />
      </div>
    </div>
  )
}

export default TokenForgetPass
