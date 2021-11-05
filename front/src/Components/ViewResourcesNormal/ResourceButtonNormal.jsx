import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import PropTypes from 'prop-types'
import less from '../../static/imagesViewResources/zoomOut.png'
import lessDisable from '../../static/imagesViewResources/zoomOutDisable.png'
import more from '../../static/imagesViewResources/zoomIn.png'
import moreDisable from '../../static/imagesViewResources/zoomInDisable.png'
import previous2 from '../../static/imagesViewResources/previousDisable.png'
import rotate from '../../static/imagesViewResources/rotate.png'
import rotateDisable from '../../static/imagesViewResources/rotateDisable.png'
import next2 from '../../static/imagesViewResources/nextDisable.png'
import dowload from '../../static/imagesViewResources/dowload.png'
import expandDisable from '../../static/imagesViewResources/expandDisable.png'
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
    return <embed className="pdfDoc" frameBorder="0" src={`${link}#toolbar=0&navpanes=0&scrollbar=0`} type={`application/${docType}`} />
  }
  if (docType === 'xls' || docType === 'ppt' || docType === 'docx') {
    return (
      <div className="office">
        <img src={`${dowload}`} alt="img" />
        <iframe title="oficeDocument" className="officeDocuments" src={`${link}`} />
      </div>
    )
  }
  if (docType === 'MP4') {
    return <iframe className="mp4See" title="video" src={`${link}`} type="vide/mp4" />
  }
  return <img className="imgfromdoc" src={`${link}`} alt="img" />
}

const BotonesRecursosNormal = ({ link, docType }) => (
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
                <button type="button" className="buttons defaultButton"><img src={previous2} alt="previous" /></button>
                {(docType === 'xls' || docType === 'ppt' || docType === 'docx')
                  ? <button type="button" className="buttonsDisable diableButton"><img src={rotateDisable} alt="previous" /></button>
                  : <button onClick={rotateImg} type="button" className="buttons"><img src={rotate} alt="rotate" /></button>}
                <h1>|</h1>
                {(docType === 'xls' || docType === 'ppt' || docType === 'docx')
                  ? <button type="button" className="buttonsDisable diableButton"><img src={lessDisable} alt="previous" /></button>
                  : <button onClick={zoomOut} type="button" className="buttons"><img src={less} alt="zoom out" /></button>}
                <button type="button" onClick={resetTransform} className="buttons"><p>ZOOM</p></button>
                {(docType === 'xls' || docType === 'ppt' || docType === 'docx')
                  ? <button type="button" className="buttonsDisable diableButton"><img src={moreDisable} alt="previous" /></button>
                  : <button onClick={zoomIn} type="button" className="buttons"><img src={more} alt="zoom in" /></button>}
                <h1>|</h1>
                {(docType === 'xls' || docType === 'ppt' || docType === 'docx')
                  ? <button type="button" className="buttonsDisable diableButton"><img src={expandDisable} alt="previous" /></button>
                  : <button onClick={Full} id="enlarge" type="button" className="buttons expand">a</button>}
                <button type="button" className="buttons defaultButton"><img src={next2} alt="next" /></button>
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

BotonesRecursosNormal.propTypes = {
  docType: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default BotonesRecursosNormal
