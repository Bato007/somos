import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BotonesRecursos from './ResourceButton'
import NavBar from '../NavBar/NavBar'
import './VResources.css'

/* Imagen de prueba para los botones */
/* Todo o que esta en TransformWrapper es para hacer zoom in y zoom out a la imagen */

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
          <button type="button" className="buttonEdit">a</button>
        </div>
        <BotonesRecursos link={resInfo.url} docType={resInfo.type} />
        <hr />
        <div className="headers editp">
          <p>
            {resInfo.description}
          </p>
          <button type="button" className="buttonEdit editbotton">a</button>
        </div>
        <center>
          <button type="button" className="buttonDelete">a</button>
        </center>
      </div>
    </div>
  )
}

export default VResources
