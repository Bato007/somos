/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'

import Swal from 'sweetalert2'
import swal from 'sweetalert'
import withReactContent from 'sweetalert2-react-content'

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
  const MySwal = withReactContent(Swal)

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
    // eslint-disable-next-line no-unused-vars
    const anuncios = await fetch(`${apiURL}/admin/announcements`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json()
      .then((data) => data))

    setActualAnnounces(anuncios)
  }

  useEffect(() => {
    getAnnounces()
  }, [])

  /**
   * Funcion usada para aceptar un anuncio: Se queda publicado y a los
   * administradores les saldra opcion de borrarlo
   */
  const acceptAnnouncement = (result) => {
    swal({
      title: 'Aceptar anuncio',
      text: '¿Estas seguro de aceptar el anuncio?',
      icon: 'success',
      buttons: ['Cancelar', 'Aceptar'],
    }).then(async (res) => {
      if (res) {
        MySwal.fire({
          title: <p>Tu petición está siendo procesada...</p>,
          didOpen: () => {
            MySwal.showLoading()
          },
          allowOutsideClick: false,
        })

        const status = await fetch(`${apiURL}/admin/announcements/accept/${result.id}`, {
          method: 'PUT',
          headers: {
            somoskey: `${localStorage.getItem('somoskey')}`,
          },
        }).then((response) => response.status)

        MySwal.close()
        if (status === 200) {
          // Se subio el archivo con exito
          swal({
            title: 'Se acepto el anuncio con éxito',
            icon: 'success',
          })
          getAnnounces()
        } else {
          // Hubo un error con la subida de archivos
          swal({
            title: 'No se pudo completar la acción',
            icon: 'error',
          })
        }
      }
    })
  }

  /**
   * Funcion usada para denegar un anuncio: Se elimina el anuncio
   */
  const deleteAnnouncement = (result) => {
    swal({
      title: 'Eliminar anuncio',
      text: '¿Estas seguro de eliminar el anuncio? Este proceso es no revertible',
      icon: 'warning',
      buttons: ['Cancelar', 'Eliminar'],
    }).then(async (res) => {
      if (res) {
        MySwal.fire({
          title: <p>Tu petición está siendo procesada...</p>,
          didOpen: () => {
            MySwal.showLoading()
          },
          allowOutsideClick: false,
        })

        const status = await fetch(`${apiURL}/admin/announcements/${result.id}`, {
          method: 'DELETE',
          headers: {
            somoskey: `${localStorage.getItem('somoskey')}`,
          },
        }).then((response) => response.status)

        MySwal.close()
        if (status === 200) {
          // Se subio el archivo con exito
          swal({
            title: 'Se eliminó con éxito',
            icon: 'success',
          })
          getAnnounces()
        } else {
          // Hubo un error con la subida de archivos
          swal({
            title: 'No se pudo completar la acción',
            icon: 'error',
          })
        }
      }
    })
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
                  <p>
                    <strong>Disponible hasta: </strong>
                    {result.toDate.split('-').reverse().join('-')}
                  </p>
                  <hr />
                  <div className="contactInfo">
                    <p>
                      <strong>Nombre del contacto: </strong>
                      {result?.contact}
                    </p>
                    { result?.contact
                      ? (
                        <p>
                          <strong>Número de celular: </strong>
                          +502
                          {' '}
                          {result?.phone}
                        </p>
                      )
                      : ''}
                    {result?.email
                      ? (
                        <p>
                          <strong>Email: </strong>
                          {result?.email}
                        </p>
                      )
                      : '' }
                  </div>
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
