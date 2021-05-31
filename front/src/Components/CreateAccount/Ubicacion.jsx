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

const Ubicacion = () => {
    const history = useHistory()
    const location = useLocation()

    /* Campos de ingreso */
    const [job, setJob] = useState('')
    const [place, setPlace] = useState('')
    const [church, setChurch] = useState('')
    const [error, setError] = useState('')

    const showData = () => {
        /* Validacion de campos vacios */
        if (place === '')
        {
            setError('No se pueden dejar campos vacios')
        }
        /* Fetch para la creacion de la cuenta */
        else {
            console.log(location.state.username)
            console.log(location.state.password)
            console.log(location.state.mail)
            console.log(location.state.name)
            console.log(location.state.phone)
            console.log(job)
            console.log(place)
            console.log(church)
        }
    }

    return (
        <div id= "Ubicacion">
            <div className="division">
                <div className="left">
                    <img src={back} alt="back" width="60px" className="back" onClick={() => history.push('../home')} />
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
                    <img src={iglesia} alt="iglesia somos" width="170px" className ="church"/>
                </div>
                <div className="right">
                    <div className="titulo">Información personal</div>
                    <h2>La información proporcionada no será compartida, únicamente estará disponible para el personal autorizado de SOMOS.</h2>
                    <center>
                        <h3>Lugar de trabajo</h3>
                        <Input className="InputCreate" type="text" name="Trabajo" placeholder="Dirección de trabajo" onChange={(event) => setJob(event.target.value)} />
                        <h3>Área de residencia</h3>
                        <Input className="InputCreate" type="text" name="Residencia" placeholder="Residencia" onChange={(event) => setPlace(event.target.value)} />
                        <h3>Iglesia asociada</h3>
                        <Input className="InputCreate" type="text" name="Iglesia" placeholder="Iglesia asociada" onChange={(event) => setChurch(event.target.value)} />
                        <center>
                        <Button id="Create" name="←  Regresar" onClick={() => history.goBack()}  />
                            <Button id="Create" name="Continuar >" onClick={showData}  />
                        </center>
                        <Error error={error} />
                    </center>
                </div> 
            </div>
        </div>
    )
}    

export default Ubicacion
