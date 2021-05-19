import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import logo from './images/logo.png'
import pre from './images/pre.png'
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
    return (
        <div id= "info">
            <div className="prueba">
            <div className="left">
                <img src={logo} alt="somos logo" width="350px" min-width="30px" />
                <div className="containerC">
                    <img src={pre} alt="pre" width="25px"/>
                    &nbsp; Información de cuenta
                    <br />
                    <br />
                    <br />
                    <img src={pre} alt="pre" width="25px" />
                    &nbsp; Información de usuario
                    <br />
                    <br />
                    <br />
                    <img src={pre} alt="pre" width="25px" />
                    &nbsp; Información de ubicación
                </div>
                <img src={iglesia} alt="iglesia somos" width="170px" min-width="50px"/>
            </div>
            <div className="right">
                <div className="titulo">Crear cuenta</div>
                Empieza creando estos datos los cuales  ayudarán a poder
                acceder a la cuenta.
                <br />
                <br />
                <h3>Usuario</h3>
                <Input className="titleInput" type="text" name="title" placeholder="Usuario" />
                <h3>Contraseña</h3>
                <Input className="titleInput" type="password" name="password" placeholder="Introduzca su contraseña" />
                <h3>Confirmación de contraseña</h3>
                <Input className="titleInput" type="password" name="password" placeholder="Introduzca su contraseña" />
                <h3>Categoría perteneciente</h3>
                <center>
                    <Button id="Create" name="Continuar >"  />
                </center>
            </div>
            </div>
        </div>
    )
}

export default Create
