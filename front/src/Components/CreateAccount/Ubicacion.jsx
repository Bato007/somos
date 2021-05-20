import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import Input from '../Input/Input'
import iglesia from './images/logoSomos.png'
import logo from './images/logo.png'
import pre from './images/pre.png'
import post from './images/post.png'
import back from './images/back.png'
import './Create.css'

const Error = ({error}) => {
    const style = {
      color: 'red',
      fontSize: '2vh'
    }
    return <h5 id="Error" style={style}>{error}</h5> 
}

const Ubicacion = () => {
    const history = useHistory()
    const location = useLocation()

    /* Variables de datos */
    const mail = location.state.mail
    const name = location.state.name
    const phone = location.state.phone
    const username = location.state.username
    const password = location.state.password
    const [job, setJob] = useState('')
    const [place, setPlace] = useState('')
    const [error, setError] = useState('')

    const showData = () => {
        if (job === '' || place === '')
        {
            setError('No se pueden dejar campos vacios')
        }else {

        }
    }

    return (
        <div id= "Ubicacion">
            <div className="division">
                <div className="left">
                    <div className="division">
                        <img src={back} alt="back" width="30px" className="back" onClick={() => history.push('../createaccount-2')} />
                        <img src={logo} alt="somos logo" width="350px" min-width="30px" />
                    </div>
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
                    <img src={iglesia} alt="iglesia somos" width="170px" min-width="50px"/>
                </div>
                <div className="right">
                    <div className="titulo">Información personal</div>
                    <h2>La información proporcionada no será compartida, únicamente estará disponible para el personal autorizado de SOMOS.</h2>
                    <h3>Lugar de trabajo</h3>
                    <Input className="InputLogin" type="text" name="Trabajo" placeholder="Dirección de trabajo" onChange={(event) => setJob(event.target.value)} />
                    <h3>Área de residencia</h3>
                    <Input className="InputLogin" type="text" name="Residencia" placeholder="IResidencia" onChange={(event) => setPlace(event.target.value)} />
                    <center>
                        <Button id="Create" name="Continuar >" onClick={showData}  />
                    </center>
                    <Error error={error} />
                </div> 
            </div>
        </div>
    )
}    

export default Ubicacion
