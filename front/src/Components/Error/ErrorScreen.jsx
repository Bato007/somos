import React from 'react'
import './ErrorScreen.css'

const ErrorScreen = () => (
  <div className="errorScreen">
    <div className="noFiles" />
    <div className="errorTexts">
      <h1>Oops! Aún no tienes recursos disponibles</h1>
      <h3>Si crees que se trata de un error, comunicate con algún administrador de SOMOS</h3>
    </div>
  </div>
)

export default ErrorScreen
