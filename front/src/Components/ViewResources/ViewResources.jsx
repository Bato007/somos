import React from 'react'
import BotonesRecursos from './ResourceButton'
import NavBar from '../NavBar/NavBar'
import './VResources.css'

/* Imagen de prueba para los botones */
/* Todo o que esta en TransformWrapper es para hacer zoom in y zoom out a la imagen */

const VResources = () => (
  <div className="vresources">
    <NavBar />
    <div id="vresources">
      <h1>Titulo del recurso</h1>
      <BotonesRecursos />
      <hr />
      <p>
        Description
      </p>
    </div>
  </div>
)

export default VResources
