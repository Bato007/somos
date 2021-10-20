import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

/**
 * Obteniendo la fecha actual para las dates disponibles en el recurso
 */
const date = () => {
  const today = new Date()
  const month = today.getMonth() + 1

  if (month.toString().length === 1) {
    return `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`
  }
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const actualDate = date()

/**
 * className: Class name en Input.css
 * type: Tipo de input: text/password/etc
 * min: Si el type es date, es opcional ingresar la fecha minima a elegir
 * name: Texto del input
 * placeholder: Placeholder en el input
 * onChange: Funcion para leer los input del usuario
 * * */
const Input = ({
  className, type, name, placeholder, onChange, value, onEnter, readOnly,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onEnter()
    }
  }

  return (
    <input
      className={className}
      type={type}
      min={actualDate}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onKeyDown={handleKeyDown}
      readOnly={readOnly}
    />
  )
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onEnter: PropTypes.func,
  readOnly: PropTypes.bool,
}

Input.defaultProps = {
  name: '',
  placeholder: '',
  className: '',
  type: '',
  value: undefined,
  onChange: () => {},
  onEnter: PropTypes.func,
  readOnly: false,
}

export default Input
