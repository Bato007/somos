import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import less from '../../static/imagesViewResources/less.JPG'
import more from '../../static/imagesViewResources/more.JPG'
import prueba from '../../static/imagesViewResources/prueba.JPG'
import back from '../../static/imagesViewResources/back.JPG'
import refresh from '../../static/imagesViewResources/reload.JPG'
import expand from '../../static/imagesViewResources/expand.JPG'
import next from '../../static/imagesViewResources/next.JPG'
/* El zoomIn y ZoomOut son parte de la libreria */
/* La imagen prueba es para ver que los botones funcionen */

// Funcion para rotar la imagen
let rotation = 0
function rotateImg() {
  rotation += 90
  if (rotation === 360) {
    rotation = 0
  }
  document.getElementById('pruebaImg').style.transform = `rotate(${rotation}deg)`
}

// Función para pantalla completa
function Full() {
  document.documentElement.webkitRequestFullscreen()
}
const BotonesRecursos = () => (
  <TransformWrapper
    defaultScale={1}
    defaultPositionX={1}
    defaultPositionY={1}
    className="containerB"
  >
    {({ zoomIn, zoomOut }) => (
      <>
        <div className="containerB">
          <img src={back} alt="back" height="55px" />
          <h1>|</h1>
          <button onClick={rotateImg} type="button"><img src={refresh} alt="refresh" height="55px" /></button>
          <h1>|</h1>
          <button onClick={zoomOut} type="button"><img src={less} alt="zoom out" height="55px" /></button>
          <p>ZOOM</p>
          <button onClick={zoomIn} type="button"><img src={more} alt="zoom in" height="55px" /></button>
          <h1>|</h1>
          <button onClick={Full} type="button"><img src={expand} alt="expand" height="55px" /></button>
          <h1>|</h1>
          <img src={next} alt="next" height="55px" />
        </div>
        <hr />
        <TransformComponent>
          <img src={prueba} alt="back" id="pruebaImg" />
        </TransformComponent>
      </>
    )}
  </TransformWrapper>
)
export default BotonesRecursos
