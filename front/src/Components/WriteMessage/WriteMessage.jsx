import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import Input from '../Input/Input'
import Button from '../Button/Button'
import apiURL from '../fetch'
import './WriteMessage.css'

const WriteMessage = ({ setWritingAnnouncement }) => {
  const history = useHistory()
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
      text: '¿Estás seguro de mandar el anuncio a revisión? Se te mandará una notificación cuando tu anuncio sea aceptado o denegado',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then(async (res) => {
      if (res) {
        // Fetch para mandar el anuncio a revision
        const response = await fetch(`${apiURL}/announcements/home`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
          },
          body: JSON.stringify({
            ...completeAnnounce,
            username: localStorage.getItem('username'),
          }),
        }).then((out) => {
          if (out.status !== 403) {
            return [out.status, out.message]
          }
          return [403, 'Error']
        })

        switch (response[0]) {
          case 200:
            // Se agrego el anuncio con exito
            swal({
              title: 'El anuncio se ha mandado con éxito a revisión',
              text: 'Se te notificará si el anuncio es aceptado o rechazado',
              icon: 'success',
            }).then((res2) => {
              if (res2) {
                const path = window.location.href.split('/')[3]
                history.push(`/${path}`)
              }
            })
            break
          case 403:
            // El usuario no tiene permitido subir un anuncio
            swal({
              title: 'Oops! Pareciera que no tienes acceso a esta función.',
              text: 'Si crees que se trata de un error, por favor comunicate con un administrador de Somos',
              icon: 'error',
            }).then((res2) => {
              if (res2) {
                const path = window.location.href.split('/')[3]
                history.push(`/${path}`)
              }
            })
            break
          case 500:
            // Error del servidor
            swal({
              title: 'Oops! Pareciera que hubo un error externo. Vuelve a intentar más tarde.',
              icon: 'error',
            }).then((res2) => {
              if (res2) {
                const path = window.location.href.split('/')[3]
                history.push(`/${path}`)
              }
            })
            break
          default: // Error de ingreso de datos
            // ERROR 100 missing required fields || empty required field
            // ERROR 101 invalid date must be 'MM-DD-YYYY'
            swal({
              title: 'Oops! Por favor, termina de rellenar todos los campos',
              icon: 'error',
            })
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
