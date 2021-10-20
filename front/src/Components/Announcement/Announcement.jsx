/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import apiURL from '../fetch'
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

  const getAnnounces = async () => {
    const data = await fetch(`${apiURL}/announcements`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json()).then((res) => res)
    setActualAnnounces(data)
  }

  const showAnnouncement = (result) => {
    setWritingAnnouncement(true)
    setCompleteAnnounce({ title: result.title, description: result.description })
  }

  useEffect(() => {
    getAnnounces()
  }, [])

  return (
    <>
      <Button id="writeAnnounce" onClick={() => setWritingAnnouncement(!writingAnnouncement)} />
      <div className="clientAnnouncements">
        <div className="acceptedAnnouncements">
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
    </>
  )
}

export default Announcement
