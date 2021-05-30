import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

/**
 * id: Id del boton
 * name: Texto a mostrar en el boton
 * onClick: Funcion realizada al darle click al boton
 * * */
const Button = ({ id, name, onClick }) => (
  <button id={id} type="button" onClick={onClick}>{name}</button>
)

Button.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
}

Button.defaultProps = {
  name: '',
  onClick: () => {},
  id: '',
}

export default Button
