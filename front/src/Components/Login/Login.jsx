import React, {useState} from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Somos from './images/logo.png'
import './Login.css'

/* Error al ingresar usuario o contrasena */
const Error = ({error}) => {
  const style = {
    color: 'red'
  }
  return <h5 id="Error" style={style}>{error}</h5> 
}

/* Form para ingresar a los recursos */
const Login = () => {
  const [account, setAccount] = useState({username: '', password: ''})
  const [error, setError] = useState('')

  //Leyendo el valor actual del input
  const handleChange = (event) => {
    setAccount({
      ...account,
      [event.target.name] : event.target.value
    })
  }

  //Revisando que la cuenta exista
  const existingAccounts = async () => {
    const username = account.username
    const password = account.password

    const json = await fetch('http://localhost:3001/authentication/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
    .then((res) => res.json())

    if (json.username === 'ERROR 101') {
      setError('Incorrect username')
    } else if (json.username === 'ERROR 102') {
      setError('Incorrect password')
    } else {
      setError('')
    }
  }

  return(
    <div id="Login">
      <img src={Somos} alt="Somos Logo" />
      <Input className="InputLogin" type="text" name="username" placeholder="&#xF007; Username" onChange={handleChange}/>
      <Input className="InputLogin" type="password" name="password" placeholder="&#xF023; Password" onChange={handleChange}/>
      <Button id="SignIn" name="Sign In" onClick={existingAccounts} />
      <Error error={error} />
    </div>
  )
}

export default Login