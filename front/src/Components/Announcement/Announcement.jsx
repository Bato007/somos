/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import WriteMessage from '../WriteMessage/WriteMessage'
import './Announcement.css'

/**
 * Se utiliza para mandar a llamar todos los anuncios publicados o sin publicar
 * Se da la opción de declinar, aceptar y borrar anuncio
 */
const Announcement = () => {
  const [actualAnnounces, setActualAnnounces] = useState([])
  const [writingAnnouncement, setWritingAnnouncement] = useState(true)
  const [completeAnnounce, setCompleteAnnounce] = useState({ title: '', description: '' })

  const getAnnounces = () => {
    // fetch de los anuncios aceptados -> Status 1
    setActualAnnounces([
      {
        id: 0,
        title: 'Petición de ayuda',
        description: 'Buenas tardes a todos, el día de hoy les quiero pedir ayuda a los integrantes para donaciones de víveres, sábanas o ropa de niños/as de 6-8 años.\nSi desean ayudar, se pueden contactar al número +502 5018-2365 o mandar un correo a ayudahogar@gmail.com\n\nGracias',
        status: 1,
      },
      {
        id: 1,
        title: 'Jornada de voluntariado el día 06 de octubre',
        description: '​De parte del hogar temporal tal, los invitamos a ser parte de la jornada de voluntariado de venta de útiles escolares. Donde todos los ingresos a obtener serán utilizados para comprar víveres, juguetes y sábanas.\nLa dirección en donde se llevará a cabo es: 13 ave 67-8 zona 17, Guatemala, Guatemala\nSi desean ser parte, comunicarse al +502 5936-7744\n\nTengan un buen día,\nMelanie Cruz,\nencargada general del hogar de niños',
        status: 1,
      },
    ])
  }

  const showAnnouncement = (result) => {
    setWritingAnnouncement(true)
    setCompleteAnnounce({ title: result.title, description: result.description })
  }

  useEffect(() => {
    getAnnounces()
  }, [])

  return (
    <div className="clientAnnouncements">
      <div className="acceptedAnnouncements">
        <Button id="writeAnnounce" onClick={() => setWritingAnnouncement(!writingAnnouncement)} />
        {actualAnnounces.map((result) => (
          <button type="button" onClick={() => showAnnouncement(result)}>
            <h1>{result.title}</h1>
            <p>{result.description}</p>
            <hr />
          </button>
        ))}
      </div>
      <div className={`${writingAnnouncement}` ? 'writeAnnouncement' : 'visualizeAnnouncement'}>
        {
          writingAnnouncement
            ? (
              <>
                <h1>{completeAnnounce.title}</h1>
                <p>{completeAnnounce.description}</p>
              </>
            )
            : <WriteMessage setWritingAnnouncement={setWritingAnnouncement} />
        }
      </div>
    </div>
  )
}

export default Announcement
