import React from 'react'
import PropTypes from 'prop-types'

/* Error al ingresar algun dato incorrecto 
  Donde: Error es el texto a mostrar en pantalla */

const style = {
  color: 'red',
  fontSize: '0.8em',
  textAlign: 'center'
}

const Error = ({error}) => (
  <h5 id="Error" style={style} data-testid="Error" >{error}</h5> 
)

Error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Error
