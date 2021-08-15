/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BotonesRecursos from './ResourceButton'
import NavBar from '../NavBar/NavBar'
import DeleteButton from './DeleteButton'
import './VResources.css'
import EditButton from './EditButton'

const VResources = () => {
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

  useEffect(() => {
    setResourceInfo()
  }, [])

  return (
    <div className="vresources">
      <NavBar />
      <div id="vresources">
        <div className="headers">
          <h1>{resInfo.title}</h1>
          <EditButton resourceId={resourceId} />
        </div>
        <BotonesRecursos link={resInfo.url} docType={resInfo.type} />
        <hr />
        <div className="editp">
          <p>
            {resInfo.description}
          </p>
          <div className="otherLine">
            {resInfo.tags !== undefined
              ? resInfo.tags.map((tag, id) => <p key={`Tag: ${id}`}>{tag}</p>)
              : null}
          </div>
        </div>
        <DeleteButton resourceId={resourceId} />
      </div>
    </div>
  )
}

export default VResources
