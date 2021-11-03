/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import Input from '../Input/Input'
import Button from '../Button/Button'
import apiURL from '../fetch'
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
    title: '', description: '', duration: '',
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
        const response = fetch(`${apiURL}/announcements/home`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
          },
          body: JSON.stringify({
            ...completeAnnounce,
            username: localStorage.getItem('username'),
          }),
        }).then((out) => [out.status, out.body])
        console.log(response)
        switch (response[0]) {
          case 200:
            // Se agrego el anuncio con exito
            break
          case 403:
            // El usuario no tiene permitido subir un anuncio
            break
          case 500:
            // Error del servidor
            break
          default: // Error de ingreso de datos
            // ERROR 100 missing required fields || empty required field
            // ERROR 101 invalid date must be 'MM-DD-YYYY'
            break
        }
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
