/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResourceButton from './ResourceButtonNormal'
import '../ViewResources/VResources.css'
import apiURL from '../fetch'

const VResourcesNormal = () => {
  const location = useLocation()
  const resourceId = location.state.detail
  const [resInfo, setResInfo] = useState()

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

  useEffect(() => {
    setResourceInfo()
  }, [])

  return (resInfo
    ? (
      <div className="vresources">
        <div id="vresources">
          <div className="headers">
            <h1>{resInfo.title}</h1>
          </div>
          <ResourceButton link={resInfo.url[0]} docType={resInfo.type} />
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
        </div>
      </div>
    )
    : ''
  )
}

export default VResourcesNormal
