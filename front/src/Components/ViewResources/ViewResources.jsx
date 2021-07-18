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
      <div className="headers">
        <h1>Titulo del recurso</h1>
        <button type="button" className="buttonEdit">a</button>
      </div>
      <BotonesRecursos />
      <hr />
      <div className="headers editp">
        <p>
          Text description
        </p>
        <button type="button" className="buttonEdit editbotton">a</button>
      </div>
      <center>
        <button type="button" className="buttonDelete">a</button>
      </center>
    </div>
  </div>
)

export default VResources
