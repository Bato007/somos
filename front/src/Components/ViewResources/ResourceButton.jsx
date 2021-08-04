import React, { useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import PropTypes from 'prop-types'
import FilePreviewer from 'react-file-previewer'
import less from '../../static/imagesViewResources/zoomOut.png'
import more from '../../static/imagesViewResources/zoomIn.png'
import previous from '../../static/imagesViewResources/previous.png'
import previous2 from '../../static/imagesViewResources/previousDisable.png'
import rotate from '../../static/imagesViewResources/rotate.png'
import next from '../../static/imagesViewResources/next.png'
import next2 from '../../static/imagesViewResources/nextDisable.png'
/* El zoomIn y ZoomOut son parte de la libreria */

// Funcion para rotar la imagen
let rotation = 0
function rotateImg() {
  rotation += 90
  if (rotation === 360) {
    rotation = 0
  }
  document.getElementById('pruebaImg').style.transform = `rotate(${rotation}deg)`
}

// Función para acceder y salir de pantalla completa
function Full() {
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

const BotonesRecursos = (props) => {
  const [url, setUrl] = useState()
  const [docType, setDocType] = useState()

  useEffect(() => {
    setUrl(props.link)
    setDocType(props.docType)
    // console.log(props)
  }, [props])

  // const file = 'https://i.blogs.es/8e8f64/lo-de-que-comprar-una-casa-es-la-mejor-inversion-hay-generaciones-que-ya-no-lo-ven-ni-de-lejos---1/840_560.jpg'
  // const type = 'jpg'
  return (
    url
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
                  <button onClick={zoomIn} type="button" className="buttons"><img src={more} alt="zoom in" /></button>
                  <h1>|</h1>
                  <button onClick={Full} id="enlarge" type="button" className="buttons expand">a</button>
                  <h1>|</h1>
                  {docType === 'png'
                    ? <button type="button" className="buttons"><img src={next} alt="next" /></button>
                    : <button type="button" className="buttonsDisable"><img src={next2} alt="next" /></button>}
                </div>
                <hr />
                <div className="docSpace">
                  <TransformComponent>
                    <FilePreviewer
                      hideControls
                      file={{
                        url: `${url}`,
                        mimeType: `https://cors-anywhere.herokuapp.com/${docType}`,
                      }}
                    />
                    {/* <img src={props.link} alt="blank" id="pruebaImg" /> */}
                  </TransformComponent>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      ) : ''
  )
}

BotonesRecursos.propTypes = {
  docType: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default BotonesRecursos
