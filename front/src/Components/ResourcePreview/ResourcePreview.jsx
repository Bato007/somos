/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import './ResourcesPreview.css'
import previewPdf from '../../static/imagesResourcesPreview/pdf.png'
import previewDoc from '../../static/imagesResourcesPreview/doc.png'
import previewPpt from '../../static/imagesResourcesPreview/ppt.png'
import previewVideo from '../../static/imagesResourcesPreview/video.png'

/**
 * Clase para mostrar la preview del recurso dependiendo de la extension del archivo
 * Donde las extensiones tomadas en cuenta son: docs, pdf, videos, ppt
 * Recibe los recursos a mostrar en formato [{title: '', resource: file}, ...]
 */
const ResourcePreview = ({ availableResources }) => {
  const history = useHistory()

  // Metodo onClick para abrir el recurso seleccionado
  const seeResource = (resourceId) => {
    // Se abriria la pantalla de ver recursos dependiendo del archivo
    history.push({ pathname: './admin/viewResources', state: { detail: resourceId } })
  }

  // Metodo para colocar la imagen correspondiente del recurso dependiendo la extension
  const getPreview = (extension) => {
    if (extension === 'pdf') {
      return previewPdf
    } if (extension === 'ppt') {
      return previewPpt
    } if (extension === 'doc') {
      return previewDoc
    }
    return previewVideo
  }

  return (
    <div key={(Math.random() + 1).toString(36).substring(7)} className="resourcePreview">
      { availableResources.map((result) => (
        <div className="resourcesContainer" onClick={() => seeResource(result.id)} key={result.id}>
          <img src={getPreview(result.resource)} alt="Resource preview" />
          <h5>{result.title}</h5>
        </div>
      ))}
    </div>
  )
}

ResourcePreview.propTypes = {
  availableResources: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, title: PropTypes.string, resource: PropTypes.string }),
  ).isRequired,
}

export default ResourcePreview
