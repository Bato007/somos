import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import back from './images/home2.png'
import pre from './images/pre.png'
import post from './images/post.png'
import './Create.css'

const Usuario = () => {
    const history = useHistory()
    const location = useLocation()

    /*Campos a ingresar*/
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState()
    const [error, setError] = useState('')

    const nextScreen = () => {
        console.log(phone)
        /* Revision de campos vacios */
        if (mail === '' || name === '')
        {
            setError('No se pueden dejar campos vacios')
        }
        /* Paso a la siguiente pagina */
        else{
            history.push({
                pathname: '../createaccount-3',
                state: {username: location.state.username, password: location.state.password, mail: mail, name: name, phone: phone}
            })
        }
    }


    return (
        <div id= "Usuario">
            <div className="division">
                <div className="left">
                    <img src={back} alt="back" width="60px" className="back" onClick={() => history.push('../home')} />
                    <div className="containerC">
                    <div className="containerText">
                        <img src={post} alt="pre" width="25px"/>
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
                    <img src={iglesia} alt="iglesia somos" width="170px"  className ="church"/>
                </div>
                <div className="right">
                    <div className="titulo">Agregar información</div>
                    <h2>Llena este apartado por si en algún momento se llega a olvidar la contraseña o el usuario.</h2>
                    <center>
                        <h3>Dirección de email</h3>
                        <Input className="InputCreate" type="text" name="email" placeholder="Correo electrónico" onChange={(event) => setMail(event.target.value)} />
                        <h3>Nombre</h3>
                        <Input className="InputCreate" type="text" name="nombre" placeholder="Nombre completo" onChange={(event) => setName(event.target.value)} />
                        <h3>Número telefónico</h3>
                        <Input className="InputCreate" type="number" name="teléfono" placeholder="Teléfono" onChange={(event) => setPhone(parseInt(event.target.value, 10))} />
                        <center>
                            <Button id="Create" name="←  Regresar" onClick={() => history.goBack()}  />
                            <Button id="Create" name="Continuar→" onClick={nextScreen}  />
                        </center>
                        <Error error={error} />
                    </center>
                </div>
            </div>
        </div>
    )
}    

export default Usuario
