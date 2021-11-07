/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react'
import Button from '../Button/Button'
import apiURL from '../fetch'
import './Request.css'

const Request = () => {
  const getPetitions = async () => {
    const data = await fetch(`${apiURL}/admin/user/petitions`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json().then((out) => [res.status, out]))
    // 0: es el status
    // 1: es la informacion
  }

  const acceptPetition = async () => {
    const status = await fetch(`${apiURL}/admin/user/approve/${localStorage.getItem('username')}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.status)
    // 200 se acepto
    // 404 no se encontro la peticion
    // 500 error del sistema
    if (status === 200) {
      // Se realizo la operacion
    } else if (status === 404) {
      // No se encontro la peticion
    } else {
      // Error del server
    }
  }

  const declinePetition = async () => {
    const status = await fetch(`${apiURL}/admin/user/disapprove/${localStorage.getItem('username')}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.status)
    // 200 se acepto
    // 404 no se encontro la peticion
    // 500 error del sistema
    if (status === 200) {
      // Se realizo la operacion
    } else if (status === 404) {
      // No se encontro la peticion
    } else {
      // Error del server
    }
  }

  useEffect(() => {
    getPetitions()
  }, [])

  return (
    <div className="requests">
      <div className="requestsTitles">
        <h1>Nombre</h1>
        <h1>Usuario</h1>
        <h1>Descripción</h1>
        <h1 />
      </div>
      <div className="requestsList">
        <p>Brandon</p>
        <p>bato007</p>
        <p>
          Ser parte de la categoría&nbsp;
          <strong>Iglesia</strong>
        </p>
        <div className="requestButtons">
          <Button id="accept" />
          <Button id="decline" />
        </div>
      </div>
    </div>
  )
}

export default Request
