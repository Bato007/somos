/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Button from '../Button/Button'
import './Announcement.css'

/**
 * Se utiliza para mandar a llamar todos los anuncios publicados o sin publicar
 * Se da la opción de declinar, aceptar y borrar anuncio
 */
const Announcement = () => {
  const [actualAnnounces, setActualAnnounces] = useState([])

  const getAnnounces = () => {
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
    setActualAnnounces([
      {
        id: 0,
        title: 'Petición de ayuda',
        description: 'Buenas tardes a todos, el día de hoy les quiero pedir ayuda a los integrantes para donaciones de víveres, sábanas o ropa de niños/as de 6-8 años.\nSi desean ayudar, se pueden contactar al número +502 5018-2365 o mandar un correo a ayudahogar@gmail.com\n\nGracias',
        status: 0,
      },
      {
        id: 1,
        title: 'Jornada de voluntariado el día 06 de octubre',
        description: '​De parte del hogar temporal tal, los invitamos a ser parte de la jornada de voluntariado de venta de útiles escolares. Donde todos los ingresos a obtener serán utilizados para comprar víveres, juguetes y sábanas.\nLa dirección en donde se llevará a cabo es: 13 ave 67-8 zona 17, Guatemala, Guatemala\nSi desean ser parte, comunicarse al +502 5936-7744\n\nTengan un buen día,\nMelanie Cruz,\nencargada general del hogar de niños',
        status: 0,
      },
    ])
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
        // eslint-disable-next-line no-restricted-globals
        if (confirm('¿Estas seguro de aceptar el anuncio?')) {
          temporalAnnounces[i].status = 1
        }
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
        // eslint-disable-next-line no-restricted-globals
        if (confirm('¿Estas seguro de eliminar el anuncio? Este proceso es no revertible')) {
          temporalAnnounces.splice(i, 1)
        }
      }
    }
    setActualAnnounces(temporalAnnounces)
  }

  return (
    <div>
      <NavBar />
      <div className="Announcements">
        {actualAnnounces.map((result) => (
          <div className="announcement" key={result.id}>
            {result.status === 0
              && (
              <div className="announcementOptions">
                <Button id="decline" onClick={() => deleteAnnouncement(result)} />
                <Button id="accept" onClick={() => acceptAnnouncement(result)} />
              </div>
              ) }
            {result.status > 0
              && (
              <div className="announcementOptions">
                <Button id="remove" onClick={() => deleteAnnouncement(result)} />
              </div>
              )}
            <h1>{result.title}</h1>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Announcement
