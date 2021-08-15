import React from 'react'
import PropTypes from 'prop-types'
import './Input.css'

/**
 * className: Class name en Input.css
 * type: Tipo de input: text/password/etc
 * min: Si el type es date, es opcional ingresar la fecha minima a elegir
 * name: Texto del input
 * placeholder: Placeholder en el input
 * onChange: Funcion para leer los input del usuario
 * * */
const Input = ({
  className, type, min, name, placeholder, onChange, value, onEnter,
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
      min={min}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onKeyDown={handleKeyDown}
    />
  )
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  min: PropTypes.string,
  value: PropTypes.string,
  onEnter: PropTypes.func,
}

Input.defaultProps = {
  name: '',
  placeholder: '',
  className: '',
  type: '',
  min: '',
  value: undefined,
  onChange: () => {},
  onEnter: PropTypes.func,
}

export default Input
