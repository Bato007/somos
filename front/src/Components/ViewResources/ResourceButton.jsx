/* eslint-disable */
import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import less from '../../static/imagesViewResources/zoomOut.png'
import more from '../../static/imagesViewResources/zoomIn.png'
import prueba from '../../static/imagesViewResources/prueba.JPG'
import previous from '../../static/imagesViewResources/previous.png'
import rotate from '../../static/imagesViewResources/rotate.png'
import next from '../../static/imagesViewResources/next.png'
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

const BotonesRecursos = (props) => (
  <div id="previewRb">
    <TransformWrapper
      Scale={1}
      defaultPositionX={100}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <div className="containerB">
            {(props.docType == "png") ? 
            <button type="button" className="buttons"><img src={previous} alt="previous" /></button>
            :null}
            <h1>|</h1>
            <button onClick={rotateImg} type="button" className="buttons"><img src={rotate} alt="rotate" /></button>
            <h1>|</h1>
            <button onClick={zoomOut} type="button" className="buttons"><img src={less} alt="zoom out" /></button>
            <button type="button" onClick={resetTransform} className="buttons"><p>ZOOM</p></button>
            <button onClick={zoomIn} type="button" className="buttons"><img src={more} alt="zoom in" /></button>
            <h1>|</h1>
            <button onClick={Full} id="enlarge" type="button" className="buttons expand">a</button>
            <h1>|</h1>
            {props.docType == "png" ? 
            <button type="button" className="buttons"><img src={next} alt="next" /></button>  
            :null}
          </div>
          <hr />
          <div className="docSpace">
            <TransformComponent>
              <img src={props.link} alt="blank" id="pruebaImg" />
            </TransformComponent>
          </div>
        </>
      )}
    </TransformWrapper>
  </div>
)

export default BotonesRecursos
