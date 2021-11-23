import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import apiURL from '../fetch'
import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import './forgotPassword.css'

const ForgotPassword = () => {
  const history = useHistory()
  const [account, setAccount] = useState({ email: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    })
  }

  const requestReset = async () => {
    const { email } = account
    setError('')
    await fetch(`${apiURL}/recovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) {
        history.push('/forgotPassword/token')
      } else {
        setError('Oops! Por favor, verifique su correo electrónico')
      }
    })
  }
  return (
    <div className="forgotPass">
      <div id="forgotPass">
        <h1>Restauración de contraseña</h1>
        <p>
          Ingresa tu correo electrónico y te enviaremos el
          código para restablecer la contraseña
        </p>
        <Input name="email" type="text" placeholder="Correo electrónico" onChange={handleChange} onEnter={requestReset} />
        {' '}
        {/* history.push('/forgotPassword/token')} */}
        <div className="buttonsFp">
          <Button id="returnToSignIn" name="Cancelar" onClick={() => history.replace('/')} />
          <Button id="SignIn" name="Continuar" onClick={requestReset} />
        </div>
        <Error error={error} />
      </div>
    </div>
  )
}

export default ForgotPassword
