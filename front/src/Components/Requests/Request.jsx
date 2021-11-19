/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import Button from '../Button/Button'
import apiURL from '../fetch'
import './Request.css'

const Request = () => {
  const [petitions, setPetitions] = useState([0, [{ '': '' }]])

  const getPetitions = async () => {
    const data = await fetch(`${apiURL}/admin/user/petitions`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json().then((out) => [res.status, out]))

    setPetitions(data)
    // 0: es el status
    // 1: es la informacion
  }

  const acceptPetition = async (username) => {
    const status = await fetch(`${apiURL}/admin/user/approve/${username}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.status)
    // 200 se acepto
    // 404 no se encontro la peticion
    // 500 error del sistema
    console.log('el status es', status)
    if (status === 200) {
      // Se realizo la operacion
      swal({
        title: 'Se ha aceptado la petición',
        icon: 'success',
        buttons: ['Aceptar'],
      })
    } else {
      // No se encontro la peticion
      swal({
        title: 'Oops! Ha occurido un error, vuelve a intentar luego',
        icon: 'error',
        buttons: ['Aceptar'],
      })
    }
  }

  const declinePetition = async (username) => {
    const status = await fetch(`${apiURL}/admin/user/disapprove/${username}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.status)
    // 200 se acepto
    // 404 no se encontro la peticion
    // 500 error del sistema
    console.log('el status es', status)
    if (status === 200) {
      // Se realizo la operacion
      swal({
        title: 'Se ha declinado la petición',
        icon: 'success',
        buttons: ['Aceptar'],
      })
    } else {
      // No se encontro la peticion
      swal({
        title: 'Oops! Ha occurido un error, vuelve a intentar luego',
        icon: 'error',
        buttons: ['Aceptar'],
      })
    }
  }

  useEffect(() => {
    getPetitions()
  }, [])

  return (
    <div className="requests">
      { petitions[0] !== 404
        ? (
          <>
            <div className="requestsTitles">
              <h1>Nombre</h1>
              <h1>Usuario</h1>
              <h1>Descripción</h1>
              <h1 />
            </div>
            <div className="requestsList">
              { petitions[1]?.map((result) => (
                <>
                  <p>{result.name}</p>
                  <p>{result.username}</p>
                  <div className="requestInformation">
                    {
                result.added
                  ? (
                    <p>
                      Ser parte de la categoría&nbsp;
                      <strong>{result.added}</strong>
                    </p>
                  )
                  : ''
              }
                    {
                result.removed
                  ? (
                    <p>
                      Removerse de la categoría&nbsp;
                      <strong>{result.removed}</strong>
                    </p>
                  )
                  : ''
              }
                  </div>
                  <div className="requestButtons">
                    <Button id="accept" onClick={() => acceptPetition(result.username)} />
                    <Button id="decline" onClick={() => declinePetition(result.username)} />
                  </div>
                </>
              ))}
            </div>
          </>
        )
        : (
          <div className="requestsList">
            <h1>Pareciera que aún no hay peticiones...</h1>
          </div>
        )}
    </div>
  )
}

export default Request
