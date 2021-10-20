import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './serviceProvider.css'

const serviceProvider = () => {
  const history = useHistory()
  const [serviceInfo, setServiceInfo] = useState({
    titleService: '', description: '', email: '', date: '',
  })

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setServiceInfo({
      ...serviceInfo,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="service">
      <div id="service">
        <h1>¿Qué servicio le gustaría brindar?</h1>
        <div className="inputServiceProvider">
          <p>Título</p>
          <Input name="title" type="text" placeholder="Servicio a brindar" />
        </div>
        <div className="inputServiceProvider">
          <p>Descripción</p>
          <textarea name="description" onChange={handleChange} />
        </div>
        <div className="inputServiceProvider">
          <p>Información de contacto</p>
          <Input name="email" type="text" placeholder="Correo electrónico" />
        </div>
        <div className="inputServiceProvider">
          <p>Último día para hacer uso de tu servicio</p>
          <Input className="titleInput" type="date" name="date" placeholder="Fecha de vigencia" onChange={handleChange} />
        </div>
        <div className="footerService">
          <div>
            <p>
              Se le avisará vía correo electrónico si el servicio es aprobado
              o denegado.
            </p>
            <p><strong>Gracias.</strong></p>
          </div>
          <Button id="SendRequest" name="Enviar solicitud" onClick={() => history.replace('/')} />
        </div>
      </div>
    </div>
  )
}

export default serviceProvider
