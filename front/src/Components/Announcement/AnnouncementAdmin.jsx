/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import apiURL from '../fetch'
import Button from '../Button/Button'
import './Announcement.css'

/**
 * Se utiliza para mandar a llamar todos los anuncios publicados o sin publicar
 * Se da la opción de declinar, aceptar y borrar anuncio
 */
const AnnouncementAdmin = () => {
  const [actualAnnounces, setActualAnnounces] = useState([])
  const [actualStatus, setActualStatus] = useState(0)

  const getAnnounces = async () => {
    // fetch de los anuncios
    /**
     * Obtengo cada anuncio con un id, title, description, status
     * Id: id del anuncio
     * Title: titulo del anuncio
     * Description: Descripcion del anuncio
     * Status: Estado del anuncio:
     *         0 (no se ha realizado ninguna accion con el)
     *         1 (ya ha sido aceptado y se muestra la opcion de borrar)
     *         2 (se ha denegado el anuncio y se procede a mandar una notificacion)
     * Email: Correo del que haya escrito el anuncio
     */
    console.log('entra en get announces')
    // eslint-disable-next-line no-unused-vars
    const anuncios = await fetch(`${apiURL}/admin/announcements`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json().then((data) => console.log(data)))

    // setActualAnnounces(anuncios)
  }

  useEffect(() => {
    getAnnounces()
  }, [])

  /**
   * Funcion usada para aceptar un anuncio: Se queda publicado y a los
   * administradores les saldra opcion de borrarlo
   */
  const acceptAnnouncement = (result) => {
    const temporalAnnounces = []

    for (let i = 0; i < actualAnnounces.length; i += 1) {
      temporalAnnounces.push(actualAnnounces[i])

      if (actualAnnounces[i] === result) {
        swal({
          title: 'Aceptar anuncio',
          text: '¿Estas seguro de aceptar el anuncio?',
          icon: 'success',
          buttons: ['Cancelar', 'Aceptar'],
        }).then(async (res) => {
          if (res) {
            await fetch(`${apiURL}/announcements/accept/${result.id}`, {
              method: 'PUT',
              headers: {
                somoskey: `${localStorage.getItem('somoskey')}`,
              },
            })
            temporalAnnounces[i].published = 1
          }
        })
      }
    }
    setActualAnnounces(temporalAnnounces)
  }

  /**
   * Funcion usada para denegar un anuncio: Se elimina el anuncio
   */
  const deleteAnnouncement = (result) => {
    const temporalAnnounces = []

    for (let i = 0; i < actualAnnounces.length; i += 1) {
      temporalAnnounces.push(actualAnnounces[i])

      if (actualAnnounces[i] === result) {
        swal({
          title: 'Eliminar anuncio',
          text: '¿Estas seguro de eliminar el anuncio? Este proceso es no revertible',
          icon: 'warning',
          buttons: ['Cancelar', 'Eliminar'],
        }).then(async (res) => {
          if (res) {
            await fetch(`${apiURL}/announcements/${result.id}`, {
              method: 'DELETE',
              headers: {
                somoskey: `${localStorage.getItem('somoskey')}`,
              },
            })
            temporalAnnounces.splice(i, 1)
          }
        })
      }
    }
    setActualAnnounces(temporalAnnounces)
  }

  /**
   * Funcion para obtener los recursos de la pestaña actual
   */
  const showActualAnnouncements = () => {
    if (actualStatus === 1) {
      setActualStatus(0)
    } else {
      setActualStatus(1)
    }
  }

  return (
    <>
      <div className="Announcements">
        <div className="AnnouncentsOptions">
          <label className="switch">
            <input type="checkbox" id="togBtn" onClick={() => showActualAnnouncements()} />
            <div className="slider round">
              <span className="on">Anuncios Aceptados</span>
              <span className="off">Anuncios en Espera</span>
            </div>
          </label>
        </div>
        {actualAnnounces.map((result) => (
          <>
            {result.published === actualStatus
              ? (
                <div className="announcement" key={result.id}>
                  {result.published === 0
              && (
              <div className="announcementOptions">
                <Button id="decline" onClick={() => deleteAnnouncement(result)} />
                <Button id="accept" onClick={() => acceptAnnouncement(result)} />
              </div>
              ) }
                  {result.published > 0
              && (
              <div className="announcementOptions">
                <Button id="remove" onClick={() => deleteAnnouncement(result)} />
              </div>
              )}
                  <h1>{result.title}</h1>
                  <p>{result.description}</p>
                </div>
              )
              : '' }
          </>
        ))}
      </div>
    </>
  )
}

export default AnnouncementAdmin
