import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import pre from './images/pre.png'
import back from './images/home2.png'
import './Create.css'

/*Form para ingresar campos */
const Create = () => {
    const history = useHistory()
    /* Campos de ingreso */
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [conf, setConf] = useState('')
    const [error, setError] = useState('')

    const nextScreen = () => {
        /* Validacion de campos no vacios */
        if (pass === '' || conf === '' || user === '')
        {
            setError('No se pueden dejar campos vacios')
        }
        /* Validacion de contrasenas iguales */
        if (pass !== conf) 
        {
            setError('Las contraseñas no coinciden')
        }
        /* Paso a la siguiente pantalla */
        if (pass === conf && pass !== '' && conf !== '' && user !== '')
        {
            history.push({
                pathname: '/createaccount-2',
                state: { username: user, password: pass }
            })
        }
    }
    return (
        <div id= "info">
            <div className="division">
            <div className="left">
                <img src={back} alt="back" width="60px" className="back" onClick={() => history.push('../home')} />
                <div className="containerC">
                    <div className="containerText">
                        <img src={pre} alt="pre" width="25px"/>
                        <p>Información de cuenta </p>
                    </div>
                    <div className="containerText">
                        <img src={pre} alt="pre" width="25px" />
                        <p>Información de usuario</p>
                    </div>
                    <div className="containerText">    
                        <img src={pre} alt="pre" width="25px" />
                        <p>Información de ubicación</p>
                    </div>
                </div>
                <img src={iglesia} alt="iglesia somos"  className ="church" width="170px"/>
            </div>
            <div className="right">
                <div className="titulo">Crear cuenta</div>
                <h2>Empieza creando estos datos los cuales  ayudarán a poder
                acceder a la cuenta.</h2>
                <h3>Usuario</h3>
                <center>
                    <Input className="InputCreate" type="text" name="username" placeholder="Usuario" onChange={(event) => setUser(event.target.value)} />
                    <h3>Contraseña</h3>
                    <Input className="InputCreate" type="password" name="password" placeholder="Introduzca su contraseña" onChange={(event) => setPass(event.target.value)} />
                    <h3>Confirmación de contraseña</h3>
                    <Input className="InputCreate" type="password" name="password" placeholder="Introduzca su contraseña" onChange={(event) => setConf(event.target.value)} />
                    <h3>Categoría perteneciente</h3>
                    <div className="oneBtn containerText botonesCA">
                        <Button id="Create" name="Continuar →" onClick={nextScreen}  />
                    </div>
                    <Error error={error} />
                </center>
            </div>
            </div>
        </div>
    )
}

export default Create
