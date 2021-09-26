/* eslint-disable max-len */
import React, { useState } from 'react'
import Input from '../Input/Input'
import './forgotPassword.css'

const ForgotPassword = () => {
  const [accountInfo, setAccountInfo] = useState({
    email: '',
  })
  const handleManageAccount = (event) => {
    setAccountInfo({
      ...accountInfo,
      [event.target.name]: event.target.value,
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
        <Input name="email" type="text" onChange={handleManageAccount} />
        {/* <Input value={mail} className="InputCreate" type="text" name="email" placeholder="Correo electrónico" onChange={(event) => setMail(event.target.value)} /> */}
      </div>

    </div>
  )
}

export default ForgotPassword
