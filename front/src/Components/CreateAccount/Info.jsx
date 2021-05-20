import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import logo from './images/logo.png'
import pre from './images/pre.png'
import back from './images/back.png'
import './Create.css'


/* Error al no ingresar algun campo */
const Error = ({error}) => {
    const style = {
      color: 'red',
      fontSize: '2vh'
    }
    return <h5 id="Error" style={style}>{error}</h5> 
}

/*Form para ingresar campos */
const Create = () => {
    const history = useHistory()
    return (
        <div id= "info">
            <div className="division">
            <div className="left">
                <div className="division">
                    <img src={back} alt="back" width="30px" className="back" onClick={() => history.push('../home')} />
                    <img src={logo} alt="somos logo" width="350px" min-width="30px" />
                </div>
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
                <img src={iglesia} alt="iglesia somos" width="170px" min-width="50px"/>
            </div>
            <div className="right">
                <div className="titulo">Crear cuenta</div>
                <h2>Empieza creando estos datos los cuales  ayudarán a poder
                acceder a la cuenta.</h2>
                <h3>Usuario</h3>
                <Input className="InputLogin" type="text" name="username" placeholder="Usuario" />
                <h3>Contraseña</h3>
                <Input className="InputLogin" type="password" name="password" placeholder="Introduzca su contraseña" />
                <h3>Confirmación de contraseña</h3>
                <Input className="InputLogin" type="password" name="password" placeholder="Introduzca su contraseña" />
                <h3>Categoría perteneciente</h3>
                <center>
                    <Button id="Create" name="Continuar >" onClick={() => history.push('../createaccount-2')}  />
                </center>
            </div>
            </div>
        </div>
    )
}

export default Create
