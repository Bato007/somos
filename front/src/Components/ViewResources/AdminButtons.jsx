import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BotonesRecursos from './ResourceButton'
import './VResources.css'

const AdminButtons = () => {
  const location = useLocation()
  const resourceId = location.state.detail
  const [resInfo, setResInfo] = useState({ })

  // Fetch para obtener la informacion del recurso seleccionado
  const setResourceInfo = async () => {
    const json = await fetch(`http://localhost:3001/resources/${resourceId}`, {
      method: 'GET',
    }).then((res) => res.json())
    setResInfo(json)
  }

  // Eliminar recurso
  const delResource = () => {
    const json = fetch(`http://localhost:3001/resources/${resourceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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
