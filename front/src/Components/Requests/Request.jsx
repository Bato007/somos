/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react'
import Button from '../Button/Button'
import apiURL from '../fetch'
import './Request.css'

const Request = () => {
  const getPetitions = () => {
    const data = fetch(`${apiURL}/admin/user/petitions`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json', somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => [res.status, res.body])
    return data
  }

  useEffect(() => {
    const petitions = getPetitions()
    console.log(petitions)
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
