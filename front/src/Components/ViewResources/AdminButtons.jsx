import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BotonesRecursos from './ResourceButton'
import apiURL from '../fetch'
import './VResources.css'

const AdminButtons = () => {
  const location = useLocation()
  const resourceId = location.state.detail
  const [resInfo, setResInfo] = useState({ })

  // Fetch para obtener la informacion del recurso seleccionado
  const setResourceInfo = async () => {
    const json = await fetch(`${apiURL}/admin/resources/${resourceId}`, {
      method: 'GET',
      headers: {
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((res) => res.json())
    setResInfo(json)
  }

  // Eliminar recurso
  const delResource = () => {
    const json = fetch(`${apiURL}/admin/resources/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        somoskey: `${localStorage.getItem('somoskey')}`,
      },
    }).then((response) => response.text())
    setResInfo(json)
  }

  useEffect(() => {
    setResourceInfo()
  }, [])

  return (
    <div className="vresources">
      <div id="vresources">
        <div className="headers">
          <h1>{resInfo.title}</h1>
          <button type="button" className="buttonEdit">a</button>
        </div>
        <BotonesRecursos link={resInfo.url} docType={resInfo.type} />
        <hr />
        <div className="headers editp">
          <p>
            {resInfo.description}
          </p>
        </div>
        <center>
          <button type="button" onClick={delResource} className="buttonDelete">a</button>
        </center>
      </div>
    </div>
  )
}

export default AdminButtons
