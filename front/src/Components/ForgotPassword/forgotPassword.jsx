import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

  const existingAccounts = async () => {
    const { email } = account
    let status
    const json = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      status = res.status
      return res.json()
    })

    if (status === 200) {
      setError('')
      const { somoskey } = json
      localStorage.setItem('email', email)
      localStorage.setItem('somoskey', somoskey)
      if (!json.isSOMOS) {
        history.push('/client')
      } else if (json.isSOMOS) {
        history.push('/admin')
      }
    } else if (json.username === 'ERROR 101') {
      setError('Correo electrónico incorrecto')
    }
  }
  return (
    <div className="forgotPass">
      <div id="forgotPass">
        <h1>Restauración de contraseña</h1>
        <p>
          Ingresa tu correo electrónico y te enviaremos el
          código para restablecer la contraseña
        </p>
        <Input name="email" type="text" placeholder="Correo electrónico" onChange={handleChange} onEnter={existingAccounts} />
        <div className="buttonsFp">
          <Button id="returnToSignIn" name="Cancel" onClick={() => history.replace('/')} />
          <Button id="SignIn" name="Continue" onClick={existingAccounts} />
        </div>
        <Error error={error} />
      </div>
    </div>
  )
}

export default ForgotPassword
