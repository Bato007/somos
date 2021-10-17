import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import PropTypes from 'prop-types'
import less from '../../static/imagesViewResources/zoomOut.png'
import more from '../../static/imagesViewResources/zoomIn.png'
import previous from '../../static/imagesViewResources/previous.png'
import previous2 from '../../static/imagesViewResources/previousDisable.png'
import rotate from '../../static/imagesViewResources/rotate.png'
import nextButton from '../../static/imagesViewResources/next.png'
import next2 from '../../static/imagesViewResources/nextDisable.png'
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
    return <embed className="docSpace" src={`${link}#toolbar=0&navpanes=0&scrollbar=0`} type={`application/${docType}`} />
  }

  return <img className="docSpace" src={`${link}#toolbar=0&navpanes=0&scrollbar=0`} alt="img" />
}

const BotonesRecursos = ({ link, docType }) => (
  link
    ? (
      <div id="previewRb">
        <TransformWrapper
          Scale={1}
          defaultPositionX={100}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="containerB">
                {(docType === 'png')
                  ? <button type="button" className="buttons"><img src={previous} alt="previous" /></button>
                  : <button type="button" className="buttonsDisable"><img src={previous2} alt="previous" /></button>}
                <h1>|</h1>
                <button onClick={rotateImg} type="button" className="buttons"><img src={rotate} alt="rotate" /></button>
                <h1>|</h1>
                <button onClick={zoomOut} type="button" className="buttons"><img src={less} alt="zoom out" /></button>
                <button type="button" onClick={resetTransform} className="buttons"><p>ZOOM</p></button>
                <button onClick={zoomIn} type="button" className="buttons">
                  <img src={more} alt="zoom in" />
                </button>
                <h1>|</h1>
                <button onClick={Full} id="enlarge" type="button" className="buttons expand">a</button>
                <h1>|</h1>
                {docType === 'png'
                  ? (
                    <button type="button" className="buttons">
                      <img src={nextButton} alt="next" />
                    </button>
                  )
                  : (
                    <button type="button" className="buttonsDisable">
                      <img src={next2} alt="next" />
                    </button>
                  )}
              </div>
              <hr />
              <div className="docSpace">
                <TransformComponent>
                  <div id="documentV">
                    {typeResource(link, docType)}
                  </div>
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    ) : ''
)

BotonesRecursos.propTypes = {
  docType: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default BotonesRecursos
