/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

import './ResourcesPreview.css'
import previewPdf from '../../static/imagesResourcesPreview/pdf.png'
import previewDoc from '../../static/imagesResourcesPreview/doc.png'
import previewPpt from '../../static/imagesResourcesPreview/ppt.png'
import previewVideo from '../../static/imagesResourcesPreview/video.png'
import previewImage from '../../static/imagesResourcesPreview/image.png'
import previewXlxs from '../../static/imagesResourcesPreview/xlsx.png'
import previewDefault from '../../static/imagesResourcesPreview/default.png'
/**
 * Clase para mostrar la preview del recurso dependiendo de la extension del archivo
 * Donde las extensiones tomadas en cuenta son: docs, pdf, videos, ppt
 * Recibe los recursos a mostrar en formato [{title: '', resource: file}, ...]
 */
const ResourcePreview = ({ availableResources }) => {
  const history = useHistory()
  const location = useLocation()

  // Metodo onClick para abrir el recurso seleccionado
  const seeResource = (resourceId) => {
    // Se abriria la pantalla de ver recursos dependiendo del archivo
    history.push({ pathname: `${location.pathname}/viewResources`, state: { detail: resourceId } })
  }

  // Metodo para colocar la imagen correspondiente del recurso dependiendo la extension
  const getPreview = (extension) => {
    const ext = extension.toLowerCase()

    if (ext.match(/(pdf)/)) {
      return previewPdf
    } if (ext.match(/(ppt|pptx)/)) {
      return previewPpt
    } if (ext.match(/(doc|word|txt|docx)/)) {
      return previewDoc
    } if (ext.match(/(jpg|jpeg|png|gif|eot|otf|webp|svg)/)) {
      return previewImage
    } if (ext.match(/(mp4|webm|wav|mp3|m4a|aac|oga)/)) {
      return previewVideo
    } if (ext.match(/(xml|xls|xlt|xlsx|xlsm|xlbs|xltx|excel)/)) {
      return previewXlxs
    }
    return previewDefault
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
