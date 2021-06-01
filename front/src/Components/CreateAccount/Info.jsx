import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Error from '../Error/Error'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import pre from './images/pre.png'
import post from './images/post.png'
import back from './images/home2.png'
import './Create.css'

/*Form para ingresar campos */
const Create = () => {
    const history = useHistory()

    const [info, setInfo] = useState(0)
    /* Campos de ingreso */
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [conf, setConf] = useState('')
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [place, setPlace] = useState('')
    const [church, setChurch] = useState('')

    const [error, setError] = useState('')

    const checkBasic = () => {
        if (user === '') {
            setError('No se ingreso usuario')
            return
        } if (pass === '') {
            setError('No se ingreso contraseña')
            return
        } if (conf === '') {
            setError('No se ingreso confirmacion')
            return
        } if (pass !== conf) {
            setError('Las contraseñas no coinciden')
            return
        } else {
            setError('')
            setInfo(1)
        }
    }

    const checkExtra = () => {
        if (mail === '') {
            setError('No se ingreso correo')
            return
        } if (name === '') {
            setError('No se ingreso nombre')
            return
        } if (phone !== '' && phone.length !== 8) {
            setError('El telefono ingresado no es valido')
            return
        } else {
            setError('')
            setInfo(2)
        }
    }

    const showData = () => {
        /* Validacion de campos vacios */
        if (place === '')
        {
            setError('No se pueden dejar campos vacios')
            return
        }
        /* Fetch para la creacion de la cuenta */
        else {
            setError('')
            console.log(user)
            console.log(pass)
            console.log(mail)
            console.log(name)
            console.log(phone)
            console.log(job)
            console.log(place)
            console.log(church)
        }
    }

    const checkedInfo = () => {
        switch (info) {
            case 1:
                return (
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
                )
            case 2:
                return (
                    <div className="containerC">
                        <div className="containerText">
                            <img src={post} alt="pre" width="25px"/>
                            <p>Información de cuenta </p>
                        </div>
                        <div className="containerText">
                            <img src={post} alt="pre" width="25px" />
                            <p>Información de usuario</p>
                        </div>
                        <div className="containerText">    
                            <img src={pre} alt="pre" width="25px" />
                            <p>Información de ubicación</p>
                        </div>
                    </div>
                )
            default:
                return (
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
                )
        }
    }

    const askedInfo = () => {
        switch (info) {
            case 1:
                return (
                    <div className="right">     
                        <div className="titulo">Agregar información</div>
                        <h2>Llena este apartado por si en algún momento se llega a olvidar la contraseña o el usuario.</h2>
                        <center>
                            <h3>Dirección de email</h3>
                            <Input value={mail} className="InputCreate" type="text" name="email" placeholder="Correo electrónico" onChange={(event) => setMail(event.target.value)} />
                            <h3>Nombre</h3>
                            <Input value={name} className="InputCreate" type="text" name="nombre" placeholder="Nombre completo" onChange={(event) => setName(event.target.value)} />
                            <h3>Número telefónico</h3>
                            <Input value={phone} className="InputCreate" type="number" name="teléfono" placeholder="Teléfono" onChange={(event) => setPhone(event.target.value)} />
                            <center>
                                <Button id="Create" name="←  Regresar" onClick={() => setInfo(0)}  />
                                <Button id="Create" name="Continuar→" onClick={checkExtra}  />
                            </center>
                            <Error error={error} />
                        </center>
                    </div>
                )
            case 2:
                return (
                    <div className="right">
                        <div className="titulo">Información personal</div>
                        <h2>La información proporcionada no será compartida, únicamente estará disponible para el personal autorizado de SOMOS.</h2>
                        <center>
                            <h3>Lugar de trabajo</h3>
                            <Input value={job} className="InputCreate" type="text" name="Trabajo" placeholder="Dirección de trabajo" onChange={(event) => setJob(event.target.value)} />
                            <h3>Área de residencia</h3>
                            <Input value={place} className="InputCreate" type="text" name="Residencia" placeholder="Residencia" onChange={(event) => setPlace(event.target.value)} />
                            <h3>Iglesia asociada</h3>
                            <Input value={church} className="InputCreate" type="text" name="Iglesia" placeholder="Iglesia asociada" onChange={(event) => setChurch(event.target.value)} />
                            <center>
                                <Button id="Create" name="←  Regresar" onClick={() => setInfo(1)}  />
                                <Button id="Create" name="Continuar >" onClick={showData}  />
                            </center>
                            <Error error={error} />
                        </center>
                    </div> 
                )
            default:
                return (
                    <div className="right">
                        <div className="titulo">Crear cuenta</div>
                        <h2>Empieza creando estos datos los cuales  ayudarán a poder
                        acceder a la cuenta.</h2>
                        <h3>Usuario</h3>
                        <center>
                            <Input value={user} className="InputCreate" type="text" name="username" placeholder="Usuario" onChange={(event) => setUser(event.target.value)} />
                            <h3>Contraseña</h3>
                            <Input value={pass} className="InputCreate" type="password" name="password" placeholder="Introduzca su contraseña" onChange={(event) => setPass(event.target.value)} />
                            <h3>Confirmación de contraseña</h3>
                            <Input value={conf} className="InputCreate" type="password" name="password" placeholder="Introduzca su contraseña" onChange={(event) => setConf(event.target.value)} />
                            <h3>Categoría perteneciente</h3>
                            <div className="oneBtn containerText botonesCA">
                                <Button id="Create" name="Continuar →" onClick={checkBasic}  />
                            </div>
                            <Error error={error} />
                        </center>
                    </div>
                )
        }
    }

    return (
        <div id= "info">
            <div className="division">
                <div className="left">
                    <img src={back} alt="back" width="60px" className="back" onClick={() => history.push('../home')} />
                    {checkedInfo()}
                    <img src={iglesia} alt="iglesia somos"  className ="church" width="170px"/>
                </div>
                {askedInfo()}
            </div>
        </div>
    )
}

export default Create
