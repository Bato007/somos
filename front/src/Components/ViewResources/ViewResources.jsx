/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResourceButton from './ResourceButton'
import DeleteButton from './DeleteButton'
import Button from '../Button/Button'
import './VResources.css'
import apiURL from '../fetch'
import EditResource from './EditResource'

const VResources = () => {
  const location = useLocation()
  const resourceId = location.state.detail
  const [resInfo, setResInfo] = useState()
  const [editResource, setEditResource] = useState(true)

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
        <>
          {
            editResource
              ? (
                <div id="vresources">
                  <div className="headers">
                    <h1>{resInfo.title}</h1>
                    <Button id="editAccount" onClick={() => setEditResource(!editResource)} />
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
                  <DeleteButton resourceId={resourceId} />
                </div>
              )
              : <EditResource resourceId={resourceId} />
          }
        </>
      </div>
    )
    : ''
  )
}

export default VResources
