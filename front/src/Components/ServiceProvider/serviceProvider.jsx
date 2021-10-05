import React from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './serviceProvider.css'

const serviceProvider = () => {
  const history = useHistory()
  return (
    <div className="service">
      <div id="service">
        <h1>¿Qué servicio le gustaría brindar?</h1>
        <div className="inputServiceProvider">
          <p>Título</p>
          <Input name="titleResource" type="text" placeholder="Título de recurso" />
        </div>
        <div className="inputServiceProvider">
          <p>Descripción</p>
          <Input name="description" type="text" placeholder="Breve descripción" />
        </div>
        <div className="inputServiceProvider">
          <p>Correo electrónico</p>
          <Input name="email" type="text" placeholder="Correo electrónico" />
        </div>
        <div className="footerService">
          <div>
            <p>
              Se le avisará por vía correo electrónico si el servicio es aprobado
              o denegado.
            </p>
            <p>Gracias.</p>
          </div>
          <Button id="SendRequest" name="Enviar solicitud" onClick={() => history.replace('/')} />
        </div>
      </div>
    </div>
  )
}

export default serviceProvider
