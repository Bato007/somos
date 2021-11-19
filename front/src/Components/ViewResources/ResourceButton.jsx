/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import PropTypes from 'prop-types'
import less from '../../static/imagesViewResources/zoomOut.png'
import more from '../../static/imagesViewResources/zoomIn.png'
import rotate from '../../static/imagesViewResources/rotate.png'
import dowload from '../../static/imagesViewResources/dowload.png'
/* El zoomIn y ZoomOut son parte de la libreria */

// Funcion para rotar la imagen
let rotation = 0
const rotateImg = () => {
  rotation += 90
  if (rotation === 360) {
    rotation = 0
  }
  document.getElementById('documentV').style.transform = `rotate(${rotation}deg)`
}

// Función para acceder y salir de pantalla completa
const Full = () => {
  const elem = document.getElementById('previewRb')
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen()
  } if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen()
  }
}
// console.log('type', docType)
const typeResource = (link, docType) => {
  if (docType === 'pdf') {
    return <embed className="pdfDoc" frameBorder="0" src={`${link}#toolbar=0&view=fitH,100`} type={`application/${docType}`} />
  }
  if (docType === 'MP4') {
    return <iframe className="mp4See" title="video" src={`${link}`} allowFullScreen type="video/mp4" />
  }
  return <img className="imgfromdoc" src={`${link}`} alt="img" />
}

const BotonesRecursos = ({ link, docType }) => {
  // eslint-disable-next-line no-unused-vars
  const [downloadResource, setDownload] = useState(false)

  useEffect(() => {
    if (docType === 'xls' || docType === 'ppt' || docType === 'docx') {
      swal({
        title: '¿Estás seguro de querer descargar el recurso?',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
      }).then((response) => {
        if (response) {
          setDownload(true)
        } else {
          setDownload(false)
        }
      })
    }
  }, [])

  return (
    link
      ? (docType === 'xls' || docType === 'ppt' || docType === 'docx')
        ? (
          <div className="docSpace">
            <div id="documentV">
              <div className="office">
                <img src={`${dowload}`} alt="img" />
                {
                  downloadResource
                    ? <iframe title="oficeDocument" src={link} className="officeDocuments" />
                    : <iframe title="oficeDocument" className="officeDocuments" />
                }
              </div>
            </div>
          </div>
        )

        : (
          <div id="previewRb">
            <TransformWrapper
              Scale={1}
              defaultPositionX={100}
              defaultPositionY={100}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  {(docType !== 'MP4')
                    ? (
                      <>

                        <div className="containerB">
                          <button onClick={() => rotateImg()} type="button" className="buttons"><img src={rotate} alt="rotate" /></button>
                          <h1>|</h1>

                          <button onClick={zoomOut} type="button" className="buttons"><img src={less} alt="zoom out" /></button>
                          <button type="button" onClick={resetTransform} className="buttons"><p>ZOOM</p></button>
                          <button onClick={zoomIn} type="button" className="buttons"><img src={more} alt="zoom in" /></button>
                          <h1>|</h1>
                          <button onClick={() => Full()} id="enlarge" type="button" className="buttons expand" />
                        </div>
                        <hr />

                        {
                          docType === 'pdf'

                            ? (
                              <div className="docSpacePDF">
                                <TransformComponent>
                                  <div id="documentV">
                                    {typeResource(link, docType)}
                                  </div>
                                </TransformComponent>
                              </div>
                            )
                            : (
                              <div className="docSpace">
                                <TransformComponent>
                                  <div id="documentV">
                                    {typeResource(link, docType)}
                                  </div>
                                </TransformComponent>
                              </div>
                            )
                        }

                      </>
                    )
                    : ''}

                  {(docType === 'MP4') ? (
                    <div className="videoSpace">
                      <TransformComponent>
                        <div id="documentV">
                          {typeResource(link, docType)}
                        </div>
                      </TransformComponent>
                    </div>
                  )
                    : ''}
                </>
              )}
            </TransformWrapper>
          </div>
        )

      : ''

  )
}

BotonesRecursos.propTypes = {
  docType: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default BotonesRecursos
