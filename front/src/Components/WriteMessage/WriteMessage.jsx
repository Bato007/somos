/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './WriteMessage.css'

/**
 * Obteniendo la fecha actual para las dates disponibles en el mensaje
 */
const date = () => {
  const today = new Date()
  const month = today.getMonth() + 1

  if (month.toString().length === 1) {
    return `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
  }
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const actualDate = date()
const formData = new FormData()

const WriteMessage = ({ setWritingAnnouncement }) => {
  const [completeAnnounce, setCompleteAnnounce] = useState({
    title: '', description: '', phone: '', email: '', duration: '',
  })

  // Leyendo el valor actual del input
  const handleChange = (event) => {
    setCompleteAnnounce({
      ...completeAnnounce,
      [event.target.name]: event.target.value,
    })
  }

  const sendAnnouncement = () => {
    swal({
      title: 'Mandar anuncio',
      text: '¿Estas seguro de mandar el anuncio a revisión? Se te mandará una notificación cuando tu anuncio sea aceptado o denegado',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then((res) => {
      if (res) {
        // Fetch para mandar el anuncio a revision
        console.log(completeAnnounce)
      }
    })
  }

  const cancelAnnouncement = () => {
    swal({
      title: 'Eliminar anuncio',
      text: '¿Estas seguro de eliminar el anuncio?',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then((res) => {
      if (res) {
        // Borrar el texto de los input
        setWritingAnnouncement(true)
      }
    })
  }

  return (
    <div className="writeAnnounce">
      <h3>Título</h3>
      <Input className="titleInput" type="text" name="title" placeholder="Titulo del anuncio" onChange={handleChange} />
      <h3>Cuerpo</h3>
      <textarea name="description" onChange={handleChange} />
      <h3>Número de contacto</h3>
      <Input className="titleInput" type="text" name="phone" placeholder="+502 0000-0000" onChange={handleChange} />
      <h3>Correo</h3>
      <Input className="titleInput" type="text" name="email" placeholder="Correo" onChange={handleChange} />
      <h3>Disponible hasta</h3>

      <div className="UploadEnd">
        <Input className="titleInput" type="date" name="duration" placeholder="Fecha de vigencia" onChange={handleChange} />
        <div className="ButtonOptions">
          <Button name="Cancelar" id="CancelButton" onClick={() => cancelAnnouncement()} />
          <Button name="Enviar" id="UploadButton" onClick={() => sendAnnouncement()} />
        </div>
      </div>
    </div>
  )
}

WriteMessage.propTypes = {
  setWritingAnnouncement: PropTypes.func,
}

WriteMessage.defaultProps = {
  setWritingAnnouncement: () => {},
}

export default WriteMessage
