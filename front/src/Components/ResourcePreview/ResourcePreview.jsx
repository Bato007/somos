import React from 'react'
import PropTypes from 'prop-types'

import './ResourcesPreview.css'
import previewPdf from './images/pdf.png'
import previewDoc from './images/doc.png'
import previewPpt from './images/ppt.png'
import previewVideo from './images/video.png'

/**
 * Clase para mostrar la preview del recurso dependiendo de la extension del archivo
 * Donde las extensiones tomadas en cuenta son: docs, pdf, videos, ppt
 * Recibe los recursos disponibles en formato [{title: '', resource: file}, ...]
 */
const ResourcePreview = ({ availableResources }) => {
  // Metodo onClick para abrir el recurso seleccionado
  const seeResource = ({ resource }) => {
    // Se abriria la pantalla de ver recursos dependiendo del archivo
    console.log({resource})
  }

  // Metodo para colocar la imagen correspondiente del recurso dependiendo la extension
  const getPreview = ({ resource }) => {
    const extension = resource.substr(resource.indexOf('.'))

    if (extension === '.pdf') {
      return previewPdf
    } else if (extension === '.ppt') {
      return previewPpt
    } else if (extension === '.doc') {
      return previewDoc
    } else {
      return previewVideo
    }
  }
  return (
    <div className="resourcePreview">
      { availableResources.map((result) => (
        <div className="resourcesContainer" onClick={seeResource} key={result.resource}>
          <img src={getPreview(result)} alt="Resource preview" />
          <h5>{result.title}</h5>
        </div>
      ))}
    </div>
  )
}

ResourcePreview.propTypes = {
  availableResources: PropTypes.arrayOf(
    PropTypes.shape({title: PropTypes.string.isRequired, resource: PropTypes.string.isRequired})
  ).isRequired,
}

export default ResourcePreview
