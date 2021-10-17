import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BotonesRecursos from './ResourceButton'
import apiURL from '../fetch'
import './VResources.css'

const AdminButtons = () => {
  const location = useLocation()
  const resourceId = location.state.detail
  const [resInfo, setResInfo] = useState({ })
  const [userInfor, setInfoUser] = useState({ })

  // Fetch para obtener la informacion del recurso seleccionado
  const setResourceInfo = async () => {
    const json = await fetch(`${apiURL}/resources/${resourceId}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())
    setResInfo(json)
  }
  // Fetch para ver si es administrador o no
  const getUserInfo = async () => {
    const userInfo = await fetch(`${apiURL}/user/${localStorage.getItem('username')}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())
    setInfoUser(userInfo)
  }

  // Eliminar recurso
  const delResource = () => {
    const json = fetch(`${apiURL}/resources/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((response) => response.text())
    setResInfo(json)
  }

  console.log('ver categoria', userInfor.categories)

  useEffect(() => {
    setResourceInfo()
    getUserInfo()
  }, [])

  return (
    <div className="vresources">
      <div id="vresources">
        <div className="headers">
          <h1>{resInfo.title}</h1>
          {userInfor.categories !== 'somos'
            ? <button type="button" className="buttonEdit">a</button>
            : null}
        </div>
        <BotonesRecursos link={resInfo.url} docType={resInfo.type} />
        <hr />
        <div className="headers editp">
          <p>
            {resInfo.description}
          </p>
        </div>
        <center>
          {userInfor.categories !== 'somos'
            ? <button type="button" onClick={delResource} className="buttonDelete">a</button>
            : null}
        </center>
      </div>
    </div>
  )
}

export default AdminButtons
